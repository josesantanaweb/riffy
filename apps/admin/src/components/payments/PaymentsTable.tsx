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
  mapPaymentStatusToStatusType,
  mapPaymentStatusToLabel,
} from '@/utils';
import MediaDisplay from '@/components/common/media-display';
import { Payment, PaymentStatus, Ticket } from '@riffy/types';

interface PaymentsTableProps {
  data: Payment[];
  onView?: (payment: Payment) => void;
  onAdd?: () => void;
  onMarkAsVerified?: () => void;
  onDownload?: () => void;
}

const PaymentsTable = ({
  data,
  onView,
  onAdd,
  onMarkAsVerified,
  onDownload,
}: PaymentsTableProps) => {
  const columns: ColumnDef<Payment>[] = [
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
    {
      accessorKey: 'ticket',
      header: 'Boleto N°',
      cell: info => {
        const ticket = info.getValue() as Ticket;
        return <p>{ticket.number}</p>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'buyerName',
      header: 'Comprador',
      cell: info => {
        const row = info.row.original;
        return <MediaDisplay label={row.buyerName} image={undefined} />;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createColumn('state', 'Estado'),
    createColumn('state', 'Metodo de Pago'),
    createDateColumn('paymentDate', 'Fecha de Pago'),
    {
      accessorKey: 'phone',
      header: 'Whatsaap',
      cell: info => {
        const handleWhatsApp = () =>
          window.open(`https://wa.me/${info.getValue() as string}`, '_blank');
        return (
          <button className="cursor-pointer" onClick={handleWhatsApp}>
            <Icon name="whatsapp" className="text-2xl" />
          </button>
        );
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => (
        <Badge
          status={mapPaymentStatusToStatusType(info.getValue() as PaymentStatus)}
          label={mapPaymentStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<Payment>[] = [
    ...(onView
      ? [
          {
            label: 'Ver Comprobante',
            icon: 'search',
            onClick: onView,
          },
        ]
      : []),
    ...(onMarkAsVerified
      ? [
          {
            label: 'Marcar como Verificado',
            icon: 'check-circle',
            onClick: onMarkAsVerified,
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
      searchFields={['buyerName']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default PaymentsTable;
