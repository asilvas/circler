import { resolve, dirname } from 'path';
import { mkdirSync, existsSync, writeFile } from 'fs';
import getFileDate from './getFileDate.mjs';

export default (dir, date, name, buffer) => {
  const datePath = getFileDate(date);
  const fullPath = resolve(dir, datePath, name);
  const dirName = dirname(fullPath);
  mkdirSync(dirName, { recursive: true });
  return new Promise((resolve, reject) => {
    try {
      console.log(`Saving '${fullPath}' to disk...`);
      writeFile(fullPath, buffer, err => {
        if (err) return void reject(err);
        resolve();
      })
    } catch (ex) {
      reject(ex);
    }
  });
}