import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const packageJson = JSON.parse(
  fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8')
);
const requiredRange = packageJson.engines?.node || '^20.19.0 || >=22.12.0';
const requestedVersion = process.argv[2] === '--version' ? process.argv[3] : null;
const version = requestedVersion || process.versions.node;
const match = /^(\d+)\.(\d+)\.(\d+)/.exec(version);

function isSupported([major, minor]) {
  return (major === 20 && minor >= 19) || major >= 22 && (major > 22 || minor >= 12);
}

if (!match || !isSupported(match.slice(1, 3).map(Number))) {
  console.error(
    [
      `Unsupported Node.js version: ${version || '<unknown>'}`,
      `This project requires Node.js ${requiredRange} for Vite ${packageJson.devDependencies?.vite || '7.x'}.`,
      'Select the project version with NVM (`nvm use`) or install the version from .nvmrc.',
      'The guard does not switch Node.js executables automatically.'
    ].join('\n')
  );
  process.exit(1);
}

console.log(`Node.js ${version} satisfies the project requirement (${requiredRange}).`);
