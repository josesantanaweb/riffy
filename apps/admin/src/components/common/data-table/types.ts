import { ColumnDef } from '@tanstack/react-table';
import type { ButtonVariant } from '@riffy/components';

export interface TableAction<T = any> {
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  onClick: (item: T) => void;
}

export interface TableButton {
  label: string;
  icon?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export interface DataTableProps<T = any> {
  data: T[];
  columns: ColumnDef<T>[];
  actions?: TableAction<T>[];
  buttons?: TableButton[];
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  enableSelection?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: { value: string; label: string }[];
  initialPageSize?: number;
}
