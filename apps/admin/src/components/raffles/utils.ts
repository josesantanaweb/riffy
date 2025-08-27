import { ColumnDef } from '@tanstack/react-table';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { BadgeStatus } from '../common/badge';
import { RaffleStatus } from '@/types';

export const TABLE_CLASSES = {
  cell: 'px-4 h-14 font-medium text-white text-sm',
  header: 'px-4 py-3 text-left font-medium text-base-200 text-sm',
  actionsCell: 'px-4 h-14',
} as const;

export const createColumn = <T extends Record<string, unknown>>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> => ({
  accessorKey,
  header,
  cell: info => info.getValue(),
  meta: {
    className: TABLE_CLASSES.cell,
    headerClassName: TABLE_CLASSES.header,
  },
});

export const createCurrencyColumn = <T extends Record<string, unknown>>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> => ({
  accessorKey,
  header,
  cell: info => formatCurrency(info.getValue() as number),
  meta: {
    className: TABLE_CLASSES.cell,
    headerClassName: TABLE_CLASSES.header,
  },
});

export const createDateColumn = <T extends Record<string, unknown>>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> => ({
  accessorKey,
  header,
  cell: info => formatDate(info.getValue() as string),
  meta: {
    className: TABLE_CLASSES.cell,
    headerClassName: TABLE_CLASSES.header,
  },
});

export const mapStatusToLabel = (status: string): string => {
  switch (status) {
    case RaffleStatus.ACTIVE:
      return 'Activa';
    case RaffleStatus.INACTIVE:
      return 'Inactiva';
    case RaffleStatus.PENDING:
      return 'Pendiente';
    case RaffleStatus.COMPLETED:
      return 'Finalizada';
    default:
      return status;
  }
};

export const mapStatusToStatusType = (status: string): BadgeStatus => {
  switch (status) {
    case RaffleStatus.ACTIVE:
      return BadgeStatus.INFO;
    case RaffleStatus.INACTIVE:
      return BadgeStatus.ERROR;
    case RaffleStatus.COMPLETED:
      return BadgeStatus.SUCCESS;
    default:
      return BadgeStatus.DEFAULT;
  }
};
