'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge, Icon } from '@riffy/components';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  TABLE_CLASSES,
  mapUserStatusToStatusType,
  mapUserStatusToLabel,
} from '@/utils';
import MediaDisplay from '@/components/common/media-display';
import { User, UserStatus } from '@riffy/types';

interface OwnersTableProps {
  data: User[];
  onEdit?: (owner: User) => void;
  onDelete?: (owner: User) => void;
  onView?: (owner: User) => void;
  onAdd?: () => void;
  onDownload?: () => void;
}

const OwnersTable = ({
  data,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onDownload,
}: OwnersTableProps) => {
  const columns: ColumnDef<User>[] = [
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
      accessorKey: 'name',
      header: 'Nombre',
      cell: info => {
        const row = info.row.original;
        return <MediaDisplay label={row.name} image={row.logo} />;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createColumn('email', 'Correo Electrónico'),
    {
      accessorKey: 'whatsapp',
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
      accessorKey: 'instagram',
      header: 'Instagram',
      cell: info => {
        const handleInstagram = () =>
          window.open(
            `https://www.instagram.com/${info.getValue() as string}`,
            '_blank',
          );
        return (
          <button className="cursor-pointer" onClick={handleInstagram}>
            <Icon name="instagram" className="text-2xl" />
          </button>
        );
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'tiktok',
      header: 'TikTok',
      cell: info => {
        const handleTikTok = () =>
          window.open(`https://www.tiktok.com/@${info.getValue() as string}`, '_blank');
        return (
          <button className="cursor-pointer" onClick={handleTikTok}>
            <Icon name="tiktok" className="text-2xl" />
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
          status={mapUserStatusToStatusType(info.getValue() as UserStatus)}
          label={mapUserStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<User>[] = [
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
      searchFields={['name']}
      searchPlaceholder="Buscar"
      enableSelection={true}
      enablePagination={true}
    />
  );
};

export default OwnersTable;
