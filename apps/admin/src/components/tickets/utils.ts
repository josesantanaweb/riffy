import { ColumnDef } from '@tanstack/react-table';
import { BadgeStatus } from '@riffy/components';
import { Ticket, TicketStatus } from '@riffy/types';

export const TABLE_CLASSES = {
  cell: 'px-4 h-14 font-medium text-white text-sm',
  header: 'px-4 py-3 text-left font-medium text-base-200 text-sm',
  actionsCell: 'px-4 h-14',
} as const;


export const createColumn = (
  accessorKey: keyof Ticket,
  header: string,
): ColumnDef<Ticket> => ({
  accessorKey,
  header,
  cell: info => info.getValue(),
  meta: {
    className: TABLE_CLASSES.cell,
    headerClassName: TABLE_CLASSES.header,
  },
});

export const mapStatusToLabel = (status: string): string => {
  switch (status) {
    case TicketStatus.AVAILABLE:
      return 'Disponible';
    case TicketStatus.RESERVED:
      return 'Reservado';
    case TicketStatus.SOLD:
      return 'Vendido';
    default:
      return status;
  }
};

export const mapStatusToStatusType = (status: string): BadgeStatus => {
  switch (status) {
    case TicketStatus.AVAILABLE:
      return BadgeStatus.INFO;
    case TicketStatus.RESERVED:
      return BadgeStatus.ERROR;
    case TicketStatus.SOLD:
      return BadgeStatus.SUCCESS;
    default:
      return BadgeStatus.DEFAULT;
  }
};
