import * as fs from 'fs';
import * as path from 'path';

const src = path.join(__dirname, '../node_modules/@wfcd/items/data/json');
const dest = path.join(__dirname, '../public/data');

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

fs.cpSync(src, dest, { recursive: true });
