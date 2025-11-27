/**
 * Utilidades para generar números de cartones de bingo
 */

/**
 * Genera un array de números aleatorios únicos dentro de un rango.
 * @param start Valor mínimo (inclusive)
 * @param end Valor máximo (inclusive)
 * @param count Cantidad de números a generar
 * @returns Array de números aleatorios únicos ordenados
 */
export function getRandomNumbersInRange(
  start: number,
  end: number,
  count: number,
): number[] {
  const range = Array.from({ length: end - start + 1 }, (_, i) => i + start);
  const shuffled = range.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

/**
 * Transpone una matriz (intercambia filas por columnas).
 * @param matrix Matriz a transponer
 * @returns Matriz transpuesta
 */
export function transposeMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

/**
 * Genera una matriz 5x5 con números válidos para un cartón de bingo.
 * Cada columna tiene un rango específico:
 * - B: 1-15
 * - I: 16-30
 * - N: 31-45
 * - G: 46-60
 * - O: 61-75
 * El centro (fila 2, columna 2) siempre es -1 (libre).
 * @returns Matriz 5x5 representando un cartón de bingo válido
 */
export function generateCardNumbers(): number[][] {
  const numbers: number[][] = [];

  for (let col = 0; col < 5; col++) {
    const start = col * 15 + 1;
    const end = start + 14;
    const columnNumbers = getRandomNumbersInRange(start, end, 5);

    numbers.push(columnNumbers);
  }

  // El centro siempre es libre (-1)
  numbers[2][2] = -1;

  return transposeMatrix(numbers);
}
