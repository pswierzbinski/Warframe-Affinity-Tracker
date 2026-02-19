import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const src = path.join(__dirname, '../node_modules/@wfcd/items/data/json');
const dest = path.join(__dirname, '../public/data');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

fs.cpSync(src, dest, { recursive: true });
console.log('Items data copied successfully');