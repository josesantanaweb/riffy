export const isBoardFull = (board: number[][]): boolean => {
  return board.every((row) => row.every((cell) => cell === -1 || cell === 0));
};

/**
 * Verifica si el cartón completo está lleno (todos los números marcados con -1)
 * @param board Matriz del tablero donde -1 indica número marcado
 * @returns true si todos los números están marcados
 */
export const checkFullCard = (board: number[][]): boolean => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      if (board[rowIndex][colIndex] !== -1) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Verifica si hay una línea horizontal completa (todos los números de una fila marcados)
 * @param board Matriz del tablero donde -1 indica número marcado
 * @returns true si hay al menos una línea horizontal completa
 */
export const checkHorizontalLine = (board: number[][]): boolean => {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    const isLineComplete = board[rowIndex].every((cell) => cell === -1);
    if (isLineComplete) {
      return true;
    }
  }
  return false;
};

/**
 * Verifica si hay una línea vertical completa (todos los números de una columna marcados)
 * @param board Matriz del tablero donde -1 indica número marcado
 * @returns true si hay al menos una línea vertical completa
 */
export const checkVerticalLine = (board: number[][]): boolean => {
  for (let colIndex = 0; colIndex < board[0]?.length; colIndex++) {
    let isColumnComplete = true;
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      if (board[rowIndex][colIndex] !== -1) {
        isColumnComplete = false;
        break;
      }
    }
    if (isColumnComplete) {
      return true;
    }
  }
  return false;
};

export const generateUniqueNumber = (generatedNumbers: Set<number>): number => {
  const availableNumbers = Array.from(
    { length: 75 },
    (_, index) => index + 1
  ).filter((num) => !generatedNumbers.has(num));

  if (availableNumbers.length === 0) {
    return -1;
  }

  const randomIndex = Math.floor(Math.random() * availableNumbers.length);
  const randomNumber = availableNumbers[randomIndex];

  return randomNumber;
};

export const getLetter = (number: number): string => {
  if (number >= 1 && number <= 15) return 'B';
  if (number >= 16 && number <= 30) return 'I';
  if (number >= 31 && number <= 45) return 'N';
  if (number >= 46 && number <= 60) return 'G';
  if (number >= 61 && number <= 75) return 'O';
  return '';
};
