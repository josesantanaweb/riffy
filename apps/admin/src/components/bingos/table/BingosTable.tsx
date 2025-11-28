'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useBreakpoint } from '@riffy/hooks';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createCurrencyColumn,
  createDateColumn,
  TABLE_CLASSES,
  mapBingoStatusToStatusType,
  mapBingoStatusToLabel,
} from '@/utils';
import { Badge } from '@riffy/components';
import MediaDisplay from '@/components/common/media-display';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';
import { Bingo, BingoStatus } from '@riffy/types';

interface BingosTableProps {
  data: Bingo[];
  loading?: boolean;
  onEdit?: (bingo: Bingo) => void;
  onDelete?: (bingo: Bingo) => void;
  onView?: (bingo: Bingo) => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

const BingosTable = ({
  data,
  loading,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onDownload,
}: BingosTableProps) => {
  const { isDesktop } = useBreakpoint();

  const columns: ColumnDef<Bingo>[] = [
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
      accessorKey: 'totalBoards',
      header: 'Boletos',
      cell: info => {
        const totalBoards = info.getValue() as number;
        return <p>{totalBoards}</p>;
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
          status={mapBingoStatusToStatusType(info.getValue() as BingoStatus)}
          label={mapBingoStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<Bingo>[] = [
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

  if (loading) {
    return (
      <TableSkeleton
        rows={10}
        columns={isDesktop ? 11 : 2}
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
      searchFields={['title', 'owner']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default BingosTable;
