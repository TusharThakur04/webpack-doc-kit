import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const CACHE_DIR = join('.', '.cache', 'webpack');

const execOptions = {
  stdio: ['ignore', 'pipe', 'inherit'],
  encoding: 'utf8',
  shell: true,
};

const fetchWebpack = version => {
  const destination = join(CACHE_DIR, version);
  const completionMarker = join(destination, '.complete');

  if (existsSync(completionMarker)) {
    console.log(`Using cached webpack ${version}`);
    return;
  }
  console.log(`Fetching webpack ${version}`);

  const result = JSON.parse(
    execFileSync(
      'npm',
      ['pack', `webpack@${version}`, '--json', '--pack-destination', CACHE_DIR],
      execOptions
    )
  );
  const { filename } = Array.isArray(result) ? result[0] : result;
  const archive = join(CACHE_DIR, filename);

  rmSync(destination, { recursive: true, force: true });
  mkdirSync(destination, { recursive: true });
  execFileSync(
    'tar',
    ['-xzf', archive, '-C', destination, '--strip-components=1'],
    execOptions
  );
  unlinkSync(archive);
  writeFileSync(completionMarker, '');
};

mkdirSync(CACHE_DIR, { recursive: true });

const versions = JSON.parse(await readFile('./versions.json'));
for (const version of versions) {
  fetchWebpack(version);
}
