'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge, Icon } from '@riffy/components';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  TABLE_CLASSES,
  createDateColumn,
  // mapPaymentMethodstatusToStatusType,
  // mapPaymentMethodstatusToLabel,
} from '@/utils';
import MediaDisplay from '@/components/common/media-display';
import { Payment, PaymentMethodStatus, PaymentMethod } from '@riffy/types';

interface PaymentMethodsTableProps {
  data: PaymentMethod[];
  onEdit?: (payment: PaymentMethod) => void;
  onAdd?: () => void;
  onDelete?: (payment: PaymentMethod) => void;
  onDownload?: () => void;
}

const PaymentMethodsTable = ({
  data,
  onEdit,
  onAdd,
  onDelete,
  onDownload,
}: PaymentMethodsTableProps) => {
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
    createColumn('paypalEmail', 'Paypal C.E.'),
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
    ...(onDownload
      ? [
          {
            label: 'Descargar',
            icon: 'download',
            variant: 'default' as const,
            onClick: onDownload,
          },
        ]
      : []),
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
