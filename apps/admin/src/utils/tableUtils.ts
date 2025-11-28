import { ColumnDef } from '@tanstack/react-table';
import { BadgeStatus } from '@riffy/components';
import {
  PaymentStatus,
  PlanUsageStatus,
  BingoStatus,
  BoardStatus,
  UserStatus,
  Currency
} from '@riffy/types';
import { formatCurrency, formatDate } from '@riffy/utils';

export const TABLE_CLASSES = {
  cell: 'px-4 h-14 font-medium text-body-100 text-sm',
  header: 'px-4 py-3 text-left font-medium text-body-100 text-sm',
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
  currency: Currency = 'VES',
): ColumnDef<T> {
  return {
    accessorKey,
    header,
    cell: info => formatCurrency(info.getValue() as number, currency),
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

export function mapBingoStatusToLabel(status: string): string {
  switch (status) {
    case BingoStatus.ACTIVE:
      return 'Activa';
    case BingoStatus.INACTIVE:
      return 'Inactiva';
    case BingoStatus.PENDING:
      return 'Pendiente';
    case BingoStatus.COMPLETED:
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

export function mapPlanUsageStatusToLabel(status: string): string {
  switch (status) {
    case PlanUsageStatus.ACTIVE:
      return 'Activo';
    case PlanUsageStatus.EXHAUSTED:
      return 'Consumido';
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

export function mapBoardStatusToLabel(status: string): string {
  switch (status) {
    case BoardStatus.AVAILABLE:
      return 'Disponible';
    case BoardStatus.SOLD:
      return 'Vendido';
    case BoardStatus.WINNER:
      return 'Ganador';
    case BoardStatus.LOSER:
      return 'Perdedor';
    case BoardStatus.PREMIUM:
      return 'Premium';
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

export function mapPlanUsageStatusToStatusType(
  status: PlanUsageStatus,
): BadgeStatus {
  switch (status) {
    case PlanUsageStatus.ACTIVE:
      return BadgeStatus.SUCCESS;
    case PlanUsageStatus.EXHAUSTED:
      return BadgeStatus.ERROR;
  }
}

export function mapPaymentStatusToStatusType(
  status: PaymentStatus,
): BadgeStatus {
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

export function mapBingoStatusToStatusType(status: BingoStatus): BadgeStatus {
  switch (status) {
    case BingoStatus.ACTIVE:
      return BadgeStatus.SUCCESS;
    case BingoStatus.INACTIVE:
      return BadgeStatus.ERROR;
    case BingoStatus.PENDING:
      return BadgeStatus.WARNING;
    case BingoStatus.COMPLETED:
      return BadgeStatus.DEFAULT;
    default:
      return BadgeStatus.DEFAULT;
  }
}

export function mapBoardStatusToStatusType(status: BoardStatus): BadgeStatus {
  switch (status) {
    case BoardStatus.AVAILABLE:
      return BadgeStatus.INFO;
    case BoardStatus.SOLD:
      return BadgeStatus.WARNING;
    case BoardStatus.WINNER:
      return BadgeStatus.SUCCESS;
    case BoardStatus.PREMIUM:
      return BadgeStatus.DEFAULT;
    default:
      return BadgeStatus.DEFAULT;
  }
}
