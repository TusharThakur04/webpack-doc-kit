import { watch, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { execFile, spawn as nativeSpawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import kill from 'tree-kill';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Grace period between SIGTERM and SIGKILL when cancelling a build.
const FORCE_KILL_MS = 3000;

// --- CHILD PROCESS TRACKING ---

const children = new Set();

const spawn = (cmd, args) => {
  const child = nativeSpawn(cmd, args, {
    stdio: 'inherit',
    shell: false,
    windowsHide: true,
  });

  children.add(child);
  child.once('close', () => children.delete(child));
  child.once('error', () => children.delete(child));

  return child;
};

// --- BUILD ---

// The build currently in flight, or null. Shape: { child, aborted, exited }
let current = null;

/**
 * Starts a build and resolves once the process has fully exited.
 * Resolves with { aborted, code } — `aborted: true` means we killed it on
 * purpose, which is not a failure and shouldn't be logged as one.
 */
function runDocKit(filePath = null) {
  const docKitBin = join(ROOT, 'node_modules', '.bin', 'doc-kit');

  const args = [
    'generate',
    '-t',
    'web',
    '--config-file',
    './scripts/html/doc-kit.config.mjs',
  ];

  // If mdx or md files changed, pass them all to the -i flag
  if (filePath) {
    args.push('-i', filePath);

    // Calculate the matching output directory
    const normalizedPath = filePath.replace(/\\/g, '/');
    const dir = dirname(normalizedPath);

    const relativeDir = dir.replace(/^pages\/?/, '');

    const outPath = relativeDir ? join('./out', relativeDir) : './out';

    args.push('-o', outPath);
  }

  // Plain execFile (not promisified) so we keep the ChildProcess handle and
  // can cancel it. Same command and options as before.
  const child = execFile(docKitBin, args, { shell: true });

  const run = { child, aborted: false, forceTimer: null };
  children.add(child);

  run.exited = new Promise(resolve => {
    const settle = result => {
      clearTimeout(run.forceTimer);
      children.delete(child);
      if (current === run) current = null;
      resolve(result);
    };

    child.once('error', error => {
      console.error(`\nCould not start build: ${error.message}`);
      settle({ aborted: run.aborted, code: null });
    });

    child.once('close', code => {
      if (run.aborted) {
        console.log('Build cancelled — restarting with the latest changes');
      } else if (code === 0) {
        console.log('\nBuild completed');
      } else {
        console.error(`\nBuild failed (exit code ${code})`);
      }

      settle({ aborted: run.aborted, code });
    });
  });

  current = run;
  return run.exited;
}

/**
 * Cancels the in-flight build, if any, and resolves only once it has actually
 * exited. Awaiting the exit matters: kill() returns immediately, and starting
 * the replacement before the old process is gone would leave two doc-kit
 * instances writing the same files under ./out.
 */
function cancelCurrent() {
  if (!current) return Promise.resolve();

  const run = current;
  run.aborted = true;

  const { pid } = run.child;

  if (pid) {
    // shell: true means `pid` is the shell, not doc-kit. tree-kill walks the
    // process tree so the actual build process goes down with it.
    kill(pid, 'SIGTERM');
    run.forceTimer = setTimeout(() => kill(pid, 'SIGKILL'), FORCE_KILL_MS);
  }

  return run.exited;
}

// --- CHANGE QUEUE ---

// Changes seen since the last build started. A cancelled build's work goes
// back in here, so the restart always covers previous + current changes.
const pending = { files: new Set(), full: false };
let draining = false;

async function drain() {
  if (draining) return;
  draining = true;

  try {
    while (pending.full || pending.files.size) {
      if (pending.full) {
        // A full build supersedes any queued partial builds.
        pending.full = false;
        pending.files.clear();

        console.log('\nRunning full build...');
        const { aborted } = await runDocKit();

        // A cancelled full build leaves ./out half-written, so redo it.
        if (aborted) pending.full = true;
      } else {
        const file = pending.files.values().next().value;
        pending.files.delete(file);

        console.log(`\nRunning fast partial build: ${file}`);
        const { aborted } = await runDocKit(file);

        if (aborted) pending.files.add(file);
      }
    }
  } finally {
    draining = false;
  }
}

async function schedule() {
  // `pending` is populated before we cancel, so the in-flight build's work is
  // never lost.
  await cancelCurrent();
  drain();
}

// --- WATCHER ---

// Directories that should trigger a FULL rebuild if anything inside them changes
const globalDirs = [
  'api',
  'components',
  'hooks',
  'layouts',
  'public',
  'styles',
  'utils',
];

let debounceTimer = null;

const handleFileChange = (baseDir, filename) => {
  // Ignore hidden files / temp editor files
  if (!filename || filename.startsWith('.')) return;

  const fullPath = join(baseDir, filename);
  const ext = extname(filename);

  // Record the change immediately; only the reaction is debounced, so a burst
  // of editor save events can never drop a file.
  if (ext === '.md' || ext === '.mdx') {
    pending.files.add(fullPath);
  } else {
    // Any other file change (jsx, css, js, mjs, png in public, etc)
    pending.full = true;
  }

  console.log(`\nFile changed: ${fullPath}`);

  // Debounce rapid save events from editors
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(schedule, 500);
};

// --- SHUTDOWN ---

let shuttingDown = false;

const cleanup = () => {
  if (shuttingDown) return;
  shuttingDown = true;

  const killTree = (pid, signal) => {
    try {
      kill(pid, signal);
    } catch (error) {
      if (error.code !== 'ESRCH') {
        throw error;
      }
    }
  };

  for (const child of children) {
    killTree(child.pid, 'SIGINT');
  }

  const timer = setTimeout(() => {
    for (const child of children) {
      killTree(child.pid, 'SIGKILL');
    }

    process.exit(1);
  }, 5000);

  const check = () => {
    if (children.size === 0) {
      clearTimeout(timer);
      process.exit(0);
    }
  };

  for (const child of children) {
    child.once('close', check);
  }

  check();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// --- STARTUP ---

console.log('Starting development environment. Running initial build...');
await runDocKit();

console.log('\nWatching directories for changes...');

// Dynamically watch all relevant directories if they exist
const watchDirs = ['pages', ...globalDirs];

for (const dir of watchDirs) {
  if (existsSync(`./${dir}`)) {
    watch(`./${dir}`, { recursive: true }, (event, filename) =>
      handleFileChange(`./${dir}`, filename)
    );
  }
}

// --- LOCAL SERVER ---

console.log('\nStarting local server...');
const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
spawn(npxCmd, ['serve', './out']);
