import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Read wordlist during build time
const wordlistPath = join(process.cwd(), 'public', 'wordlist.txt');
const wordlistContent = readFileSync(wordlistPath, 'utf8');

export default wordlistContent;
