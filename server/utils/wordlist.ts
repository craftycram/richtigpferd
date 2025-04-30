import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

console.log(readdirSync(process.cwd()));

// Read wordlist during build time
const wordlistPath = join(process.cwd(), 'wordlist.txt');
const wordlistContent = readFileSync(wordlistPath, 'utf8');

export default wordlistContent;
