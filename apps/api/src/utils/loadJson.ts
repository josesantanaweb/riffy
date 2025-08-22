import { readFileSync } from 'fs';
import { join } from 'path';

export function loadJson<T>(filename: string): T {
  return JSON.parse(
    readFileSync(join(process.cwd(), 'prisma', 'data', filename), 'utf-8'),
  ) as T;
}
