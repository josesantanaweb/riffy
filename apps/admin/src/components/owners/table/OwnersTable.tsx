'use client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useBreakpoint } from '@riffy/hooks';
import { Badge, Icon } from '@riffy/components';
import DataTable from '@/components/common/data-table';
import { TableAction, TableButton } from '@/components/common/data-table/types';
import {
  createColumn,
  TABLE_CLASSES,
  mapUserStatusToStatusType,
  mapUserStatusToLabel,
  mapPlanUsageStatusToStatusType,
  mapPlanUsageStatusToLabel,
} from '@/utils';
import TableSkeleton from '@/components/common/skeleton/TableSkeleton';
import MediaDisplay from '@/components/common/media-display';
import { User, UserStatus, PlanUsageStatus } from '@riffy/types';

interface OwnersTableProps {
  data: User[];
  loading?: boolean;
  onEdit?: (owner: User) => void;
  onDelete?: (owner: User) => void;
  onAdd?: () => void;
}

const OwnersTable = ({ data, loading, onEdit, onDelete, onAdd }: OwnersTableProps) => {
  const { isDesktop } = useBreakpoint();

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
          window.open(
            `https://wa.me/+58${info.getValue() as string}`,
            '_blank',
          );
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
          window.open(
            `https://www.tiktok.com/@${info.getValue() as string}`,
            '_blank',
          );
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
    {
      accessorKey: 'plan.name',
      header: 'Plan',
      cell: info => {
        const row = info.row.original;
        const planName = row?.plan?.name;
        return (
          <span className="text-sm text-white">{planName || 'Sin plan'}</span>
        );
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      accessorKey: 'planUsage.status',
      header: 'Estado del plan',
      cell: info => (
        <Badge
          status={mapPlanUsageStatusToStatusType(
            info.getValue() as PlanUsageStatus,
          )}
          label={mapPlanUsageStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const actions: TableAction<User>[] = [
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

export default OwnersTable;
