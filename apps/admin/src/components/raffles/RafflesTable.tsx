'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  createCurrencyColumn,
  createDateColumn,
  TABLE_CLASSES,
  mapRaffleStatusToStatusType,
  mapRaffleStatusToLabel,
} from '@/utils';
import { Badge } from '@riffy/components';
import MediaDisplay from '@/components/common/media-display';
import { Raffle, RaffleStatus } from '@riffy/types';

interface RafflesTableProps {
  data: Raffle[];
  onEdit?: (raffle: Raffle) => void;
  onDelete?: (raffle: Raffle) => void;
  onView?: (raffle: Raffle) => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

const RafflesTable = ({
  data,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onDownload,
}: RafflesTableProps) => {
  const columns: ColumnDef<Raffle>[] = [
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
      accessorKey: 'title',
      header: 'Titulo',
      cell: info => {
        const row = info.row.original;
        return <MediaDisplay label={row.title} image={row.banner} />;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    // {
    //   accessorKey: 'owner',
    //   header: 'Dueño',
    //   cell: info => {
    //     const owner = info.getValue() as { name: string; image: string };
    //     return <MediaDisplay label={owner.name} image={owner.image} />;
    //   },
    //   meta: {
    //     className: TABLE_CLASSES.cell,
    //     headerClassName: TABLE_CLASSES.header,
    //   },
    // },
    createCurrencyColumn('award', 'Premio'),
    createCurrencyColumn('price', 'Precio'),
    {
      accessorKey: 'totalTickets',
      header: 'Boletos',
      cell: info => {
        const totalTickets = info.getValue() as number;
        return <p>{totalTickets}</p>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'sold',
      header: 'Vendidos',
      cell: info => {
        const sold = info.getValue() as number;
        return <p>{sold}</p>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'available',
      header: 'Disponibles',
      cell: info => {
        const available = info.getValue() as number;
        return <p>{available}</p>;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createDateColumn('drawDate', 'Fecha'),
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => (
        <Badge
          status={mapRaffleStatusToStatusType(info.getValue() as RaffleStatus)}
          label={mapRaffleStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<Raffle>[] = [
    ...(onView
      ? [
          {
            label: 'Ver Boletos',
            icon: 'search',
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
      searchFields={['title', 'owner']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default RafflesTable;
