'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  TABLE_CLASSES,
  mapTicketStatusToStatusType,
  mapTicketStatusToLabel,
} from '@/utils';
import { Badge } from '@riffy/components';
import MediaDisplay from '@/components/common/media-display';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';
import { Payment, Ticket, TicketStatus } from '@riffy/types';

interface TicketsTableProps {
  data: Ticket[];
  loading?: boolean;
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
  onMarkAsWinner?: (ticket: Ticket) => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

const TicketsTable = ({
  data,
  loading,
  onEdit,
  onDelete,
  onMarkAsWinner,
  onAdd,
  onDownload,
}: TicketsTableProps) => {
  const columns: ColumnDef<Ticket>[] = [
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
      accessorKey: 'payment',
      header: 'Comprador',
      cell: info => {
        const payment = info.getValue() as Payment;
        return payment?.buyerName ? (
          <MediaDisplay label={payment?.buyerName} image={undefined} />
        ) : (
          'N/A'
        );
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createColumn('number', 'Numero'),
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => (
        <Badge
          status={mapTicketStatusToStatusType(info.getValue() as TicketStatus)}
          label={mapTicketStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<Ticket>[] = [
    ...(onMarkAsWinner
      ? [
          {
            label: 'Marcar como ganador',
            icon: 'check-circle',
            onClick: onMarkAsWinner,
          },
        ]
      : []),
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

  if (loading) {
    return (
      <TableSkeleton
        rows={10}
        columns={4}
        showActions={true}
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
      searchFields={['number']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default TicketsTable;
