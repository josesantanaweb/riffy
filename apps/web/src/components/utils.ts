export const transposeMatrix = (matrix: number[][]): number[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

export const isBoardFull = (board: number[][]): boolean => {
  return board.every((row) => row.every((cell) => cell === -1 || cell === 0));
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
