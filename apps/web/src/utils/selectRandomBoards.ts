import { Board, BoardStatus } from '@riffy/types';

/**
 * Selecciona boards aleatorios disponibles de un array de boards
 * @param boards Array de todos los boards
 * @param quantity Cantidad de boards aleatorios a seleccionar
 * @param returnIds Si true, retorna solo los IDs. Si false, retorna los objetos completos
 * @returns Array de boards aleatorios o sus IDs según el parámetro returnIds
 */
export const selectRandomBoards = (
  boards: Board[],
  quantity: number,
  returnIds: boolean = false,
): Board[] | string[] => {
  const availableBoards = boards.filter(
    (board) => board.status === BoardStatus.AVAILABLE,
  );

  if (availableBoards.length < quantity) {
    return returnIds ? [] : [];
  }

  const shuffledBoards = [...availableBoards].sort(() => Math.random() - 0.5);
  const selectedBoards = shuffledBoards.slice(0, quantity);

  return returnIds ? selectedBoards.map((board) => board.id) : selectedBoards;
};
