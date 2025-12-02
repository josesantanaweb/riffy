/**
 * Obtiene la letra del bingo según el número.
 * Los rangos son:
 * - B: 1-15
 * - I: 16-30
 * - N: 31-45
 * - G: 46-60
 * - O: 61-75
 *
 * @param number Número del bingo (1-75)
 * @returns La letra correspondiente (B, I, N, G, O) o string vacío si está fuera de rango
 *
 * @example
 * getBingoLetter(5) // 'B'
 * getBingoLetter(20) // 'I'
 * getBingoLetter(40) // 'N'
 */
export const getBingoLetter = (number: number): string => {
  if (number >= 1 && number <= 15) return 'B';
  if (number >= 16 && number <= 30) return 'I';
  if (number >= 31 && number <= 45) return 'N';
  if (number >= 46 && number <= 60) return 'G';
  if (number >= 61 && number <= 75) return 'O';
  return '';
};

/**
 * Obtiene la clase de color de fondo según la letra del bingo.
 * Los colores asignados son:
 * - B: bg-violet-600 (violeta)
 * - I: bg-green-500 (verde)
 * - N: bg-blue-500 (azul)
 * - G: bg-yellow-500 (amarillo)
 * - O: bg-red-500 (rojo)
 *
 * @param letter Letra del bingo (B, I, N, G, O)
 * @returns La clase de Tailwind CSS para el color de fondo
 *
 * @example
 * getBingoColor('B') // 'bg-violet-600'
 * getBingoColor('I') // 'bg-green-500'
 */
export const getBingoColor = (letter: string): string => {
  switch (letter.toUpperCase()) {
    case 'B':
      return 'bg-violet-600';
    case 'I':
      return 'bg-green-500';
    case 'N':
      return 'bg-blue-500';
    case 'G':
      return 'bg-yellow-500';
    case 'O':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

/**
 * Obtiene la clase de color de fondo según el número del bingo.
 * Esta función combina getBingoLetter y getBingoColor para obtener
 * directamente el color desde el número.
 *
 * @param number Número del bingo (1-75)
 * @returns La clase de Tailwind CSS para el color de fondo
 *
 * @example
 * getBingoColorByNumber(5) // 'bg-violet-600'
 * getBingoColorByNumber(20) // 'bg-green-500'
 */
export const getBingoColorByNumber = (number: number): string => {
  const letter = getBingoLetter(number);
  return getBingoColor(letter);
};

