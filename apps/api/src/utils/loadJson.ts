import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';

export function loadJson<T>(filename: string): T {
  const possiblePaths = [
    join(process.cwd(), 'apps/api/prisma', 'data', filename),
    join(__dirname, '..', '..', 'prisma', 'data', filename),
    join(dirname(process.cwd()), 'apps/api/prisma', 'data', filename),
  ];

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
