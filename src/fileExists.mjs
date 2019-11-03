import { resolve } from 'path';
import { existsSync } from 'fs';
import getFileDate from './getFileDate.mjs';

export default (dir, date, name) => {
  const datePath = getFileDate(date);
  const fullPath = resolve(dir, datePath, name);

  return existsSync(fullPath);
}
