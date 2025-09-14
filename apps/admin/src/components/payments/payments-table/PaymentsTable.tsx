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
import { Payment, PaymentStatus, Ticket } from '@riffy/types';

interface PaymentsTableProps {
  data: Payment[];
  onView?: (payment: Payment) => void;
  onMarkAsVerified?: (payment: Payment) => void;
  onMarkAsDenied?: (payment: Payment) => void;
  onDownload?: () => void;
}

const PaymentsTable = ({
  data,
  onView,
  onMarkAsVerified,
  onMarkAsDenied,
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
      accessorKey: 'tickets',
      header: 'Boleto N°',
      cell: info => {
        const tickets = info.getValue() as Ticket[];
        if (!tickets || tickets.length === 0) {
          return <p>N/A</p>;
        }

        const ticketNumbers = tickets.map(ticket => ticket.number).join(', ');
        return <p>{ticketNumbers}</p>;
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
        return <h4>{row.buyerName}</h4>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createColumn('state', 'Estado'),
    createColumn('paymentMethod', 'Metodo de Pago'),
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
            label: 'Marcar como verificado',
            icon: 'check-circle',
            onClick: onMarkAsVerified,
          },
        ]
      : []),
    ...(onMarkAsDenied
      ? [
          {
            label: 'Marcar como no verificado',
            icon: 'close',
            onClick: onMarkAsDenied,
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
