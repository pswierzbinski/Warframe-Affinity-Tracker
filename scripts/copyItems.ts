import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import Items from '@wfcd/items';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawItems = new Items({ category: ["Archwing", "Arch-Gun", "Arch-Melee", "Melee", "Pets", "Primary", "Secondary", "Sentinels", "SentinelWeapons", "Warframes"] });
const rawNodes = new Items({ category: ["Node"] });

const dest = path.join(__dirname, '../public/data');
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
}

fs.writeFileSync(path.join(dest, 'items.json'), JSON.stringify(rawItems), 'utf-8');
fs.writeFileSync(path.join(dest, 'nodes.json'), JSON.stringify(rawNodes), 'utf-8');

console.log('Items data copied successfully');