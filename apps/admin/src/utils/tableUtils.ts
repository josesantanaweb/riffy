import { ColumnDef } from '@tanstack/react-table';
import { BadgeStatus } from '@riffy/components';
import { PaymentStatus, RaffleStatus, TicketStatus, UserStatus } from '@riffy/types';
import { formatCurrency, formatDate } from '@/utils';

export const TABLE_CLASSES = {
  cell: 'px-4 h-14 font-medium text-white text-sm',
  header: 'px-4 py-3 text-left font-medium text-base-200 text-sm',
  actionsCell: 'px-4 h-14',
} as const;

export function createColumn<T>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    cell: info => info.getValue() || 'N/A',
    meta: {
      className: TABLE_CLASSES.cell,
      headerClassName: TABLE_CLASSES.header,
    },
  };
}

export function createCurrencyColumn<T>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    cell: info => formatCurrency(info.getValue() as number),
    meta: {
      className: TABLE_CLASSES.cell,
      headerClassName: TABLE_CLASSES.header,
    },
  };
}

export function createDateColumn<T>(
  accessorKey: keyof T,
  header: string,
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    cell: info => formatDate(info.getValue() as string),
    meta: {
      className: TABLE_CLASSES.cell,
      headerClassName: TABLE_CLASSES.header,
    },
  };
}

export function mapRaffleStatusToLabel(status: string): string {
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
}

export function mapUserStatusToLabel(status: string): string {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'Activo';
    case UserStatus.INACTIVE:
      return 'Inactivo';
    default:
      return status;
  }
}

export function mapPaymentStatusToLabel(status: string): string {
  switch (status) {
    case PaymentStatus.PENDING:
      return 'Pendiente';
    case PaymentStatus.VERIFIED:
      return 'Verificado';
    case PaymentStatus.DENIED:
      return 'Denegado';
    default:
      return status;
  }
}

export function mapTicketStatusToLabel(status: string): string {
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
}

export function mapUserStatusToStatusType(status: UserStatus): BadgeStatus {
  switch (status) {
    case UserStatus.ACTIVE:
      return BadgeStatus.SUCCESS;
    case UserStatus.INACTIVE:
      return BadgeStatus.ERROR;
    default:
      return BadgeStatus.DEFAULT;
  }
}

export function mapPaymentStatusToStatusType(status: PaymentStatus): BadgeStatus {
  switch (status) {
    case PaymentStatus.PENDING:
      return BadgeStatus.WARNING;
    case PaymentStatus.VERIFIED:
      return BadgeStatus.SUCCESS;
    case PaymentStatus.DENIED:
      return BadgeStatus.ERROR;
    default:
      return BadgeStatus.DEFAULT;
  }
}

export function mapRaffleStatusToStatusType(status: RaffleStatus): BadgeStatus {
  switch (status) {
    case RaffleStatus.ACTIVE:
      return BadgeStatus.SUCCESS;
    case RaffleStatus.INACTIVE:
      return BadgeStatus.ERROR;
    case RaffleStatus.COMPLETED:
      return BadgeStatus.DEFAULT;
    default:
      return BadgeStatus.DEFAULT;
  }
}

export function mapTicketStatusToStatusType(status: TicketStatus): BadgeStatus {
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
}
