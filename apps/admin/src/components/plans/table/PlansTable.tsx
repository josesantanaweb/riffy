
'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  TABLE_CLASSES,
  createCurrencyColumn,
} from '@/utils';
import { Plan } from '@riffy/types';
import { useBreakpoint } from '@/hooks';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';

interface PlansTableProps {
  data: Plan[];
  loading?: boolean;
  onEdit?: (plan: Plan) => void;
  onDelete?: (plan: Plan) => void;
  onAdd?: () => void;
}

const PlansTable = ({
  data,
  loading,
  onEdit,
  onDelete,
  onAdd,
}: PlansTableProps) => {
  const { isDesktop } = useBreakpoint();

  const columns: ColumnDef<Plan>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: info => {
        const row = info.row.original;
        return <p className="uppercase">{row.id.slice(15, 25)}</p>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createColumn('name', 'Nombre'),
    createCurrencyColumn('price', 'Precio', 'USD'),
    createColumn('maxRaffles', 'Maximo de rifas'),
    createColumn('maxTickets', 'Maximo de boletos'),
  ];

  const actions: TableAction<Plan>[] = [
    ...(onEdit
      ? [
          {
            label: 'Editar',
            icon: 'edit',
            onClick: onEdit,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            label: 'Eliminar',
            icon: 'trash',
            variant: 'danger' as const,
            onClick: onDelete,
          },
        ]
      : []),
  ];

  const buttons: TableButton[] = [
    ...(onAdd
      ? [
          {
            label: 'Agregar',
            icon: 'plus',
            variant: 'primary' as const,
            onClick: onAdd,
          },
        ]
      : []),
  ];

  if (loading) {
    return (
      <TableSkeleton
        rows={10}
        columns={isDesktop ? 8 : 2}
        showActions={isDesktop ? true : false}
        showPagination={true}
      />
    );
  }

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      buttons={buttons}
      searchFields={['name']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default PlansTable;
