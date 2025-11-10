import { Ticket, TicketStatus } from '@riffy/types';

/**
 * Selecciona tickets aleatorios disponibles de un array de tickets
 * @param tickets Array de todos los tickets
 * @param quantity Cantidad de tickets aleatorios a seleccionar
 * @param returnIds Si true, retorna solo los IDs. Si false, retorna los objetos completos
 * @returns Array de tickets aleatorios o sus IDs según el parámetro returnIds
 */
export const selectRandomTickets = (
  tickets: Ticket[],
  quantity: number,
  returnIds: boolean = false,
): Ticket[] | string[] => {
  const availableTickets = tickets.filter(
    (ticket) => ticket.status === TicketStatus.AVAILABLE,
  );

  if (availableTickets.length < quantity) {
    return returnIds ? [] : [];
  }

  const shuffledTickets = [...availableTickets].sort(() => Math.random() - 0.5);
  const selectedTickets = shuffledTickets.slice(0, quantity);

  return returnIds ? selectedTickets.map((ticket) => ticket.id) : selectedTickets;
};
