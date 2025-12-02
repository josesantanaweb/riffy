import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

export function loadJson<T>(filename: string): T {
  const baseDir = __dirname.includes('dist')
    ? join(__dirname, '..', '..')
    : join(__dirname, '..', '..');

  const cwd = process.cwd();
  const isInApiDir = cwd.endsWith('apps/api') || cwd.endsWith('apps\\api');

  const possiblePaths = [
    resolve(baseDir, 'prisma', 'data', filename),
    resolve(cwd, 'prisma', 'data', filename),
    join(baseDir, 'prisma', 'data', filename),
    join(cwd, 'prisma', 'data', filename),
  ];

  if (!isInApiDir) {
    possiblePaths.push(
      resolve(cwd, 'apps', 'api', 'prisma', 'data', filename),
      join(cwd, 'apps', 'api', 'prisma', 'data', filename),
    );
  }

  let dataPath: string | null = null;

  for (const path of possiblePaths) {
    if (existsSync(path)) {
      dataPath = path;
      break;
    }
  }

  if (!dataPath) {
    throw new Error(
      `No se pudo encontrar el archivo ${filename} en ninguna de las rutas esperadas: ${possiblePaths.join(', ')}`,
    );
  }

  try {
    return JSON.parse(readFileSync(dataPath, 'utf-8')) as T;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    throw new Error(
      `Error al leer o parsear el archivo ${filename} desde ${dataPath}: ${message}`,
    );
  }
}
