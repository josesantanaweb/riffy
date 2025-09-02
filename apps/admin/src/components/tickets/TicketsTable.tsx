'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  createDateColumn,
  TABLE_CLASSES,
  mapTicketStatusToStatusType,
  mapTicketStatusToLabel,
} from '@/utils';
import { Badge } from '@riffy/components';
import MediaDisplay from '@/components/common/media-display';
import { Purchase, Ticket, TicketStatus } from '@riffy/types';

interface TicketsTableProps {
  data: Ticket[];
  onEdit?: (ticket: Ticket) => void;
  onDelete?: (ticket: Ticket) => void;
  onView?: (ticket: Ticket) => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

const TicketsTable = ({
  data,
  onEdit,
  onDelete,
  onView,
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
      accessorKey: 'purchase',
      header: 'Comprador',
      cell: info => {
        const purchase = info.getValue() as Purchase;
        return purchase?.buyerName ? <MediaDisplay label={purchase?.buyerName} image={undefined} /> : 'N/A';
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
    ...(onView
      ? [
          {
            label: 'Ver Boletos',
            icon: 'ticket',
            onClick: onView,
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
