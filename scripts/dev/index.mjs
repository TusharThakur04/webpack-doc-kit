import { watch, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

async function runDocKit(filePath = null) {
  const args = [
    '-p',
    '@node-core/doc-kit',
    'doc-kit',
    'generate',
    '-t',
    'web',
    '--config-file',
    './scripts/html/doc-kit.config.mjs',
  ];

  // If mdx or md files changed, pass them all to the -i flag
  if (filePath) {
    console.log(filePath);
    args.push('-i', filePath);

    // Calculate the matching output directory
    const normalizedPath = filePath.replace(/\\/g, '/');
    const dir = dirname(normalizedPath);

    const relativeDir = dir.replace(/^pages\/?/, '');

    const outPath = relativeDir ? join('./out', relativeDir) : './out';

    args.push('-o', outPath);
  }

  await execFileAsync('npx', args, { shell: true });
  console.log('\nBuild completed');
}

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

console.log('Starting development environment. Running initial build...');
await runDocKit();

console.log('\nWatching directories for changes...');

let debounceTimer = null;
let isBuilding = false;

const handleFileChange = (baseDir, filename) => {
  // Ignore hidden files / temp editor files
  if (!filename || filename.startsWith('.')) return;

  const fullPath = join(baseDir, filename);
  const ext = extname(filename);

  // Debounce rapid save events from editors
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (isBuilding) return;

    isBuilding = true;

    if (ext === '.md' || ext === '.mdx') {
      // Wrap the single file in an array to match the new function signature
      console.log(
        `\nFile changed: ${fullPath} \nRunning fast partial build...`
      );
      await runDocKit(fullPath);
    } else {
      // Any other file change (jsx, css, js, mjs, png in public, etc) triggers a full build
      console.log(`\nFile changed: ${fullPath} \nRunning full build...`);
      await runDocKit();
    }

    isBuilding = false;
  }, 150);
};

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
spawn('npx', ['serve', './out'], { stdio: 'inherit', shell: true });
