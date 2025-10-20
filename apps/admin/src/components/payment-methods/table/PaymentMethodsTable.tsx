'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';
import { createColumn, TABLE_CLASSES } from '@/utils';
import { useBreakpoint } from '@/hooks';
import { PaymentMethod } from '@riffy/types';

interface PaymentMethodsTableProps {
  data: PaymentMethod[];
  loading?: boolean;
  onEdit?: (payment: PaymentMethod) => void;
  onAdd?: () => void;
  onDelete?: (payment: PaymentMethod) => void;
  onDownload?: () => void;
}

const PaymentMethodsTable = ({
  data,
  loading,
  onEdit,
  onAdd,
  onDelete,
}: PaymentMethodsTableProps) => {
  const { isDesktop } = useBreakpoint();

  const columns: ColumnDef<PaymentMethod>[] = [
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
    createColumn('bankName', 'Nombre del Banco'),
    createColumn('nationalId', 'Cedula'),
    createColumn('phoneNumber', 'Telefono'),
    createColumn('binanceId', 'Binance ID'),
    createColumn('paypalEmail', 'Correo de Paypal'),
  ];

  const actions: TableAction<PaymentMethod>[] = [
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

export default PaymentMethodsTable;
