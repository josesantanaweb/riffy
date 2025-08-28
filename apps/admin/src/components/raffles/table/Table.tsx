'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  createColumn,
  createCurrencyColumn,
  createDateColumn,
  TABLE_CLASSES,
  mapStatusToStatusType,
  mapStatusToLabel,
} from '../utils';
import {
  Badge,
  Checkbox,
  Button,
  Icon,
  Input,
  Select,
} from '@riffy/components';
import MediaDisplay from '@/components/common/media-display';
import ActionMenu from '@/components/common/action-menu';
import Pagination from '@/components/common/pagination';
import { PAGINATION_PAGE_SIZE } from '@/constants';
import { Raffle } from '@riffy/types';

const pageSizeOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
];

interface TableProps {
  data: Raffle[];
}

const Table = ({ data }: TableProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  const handleEdit = (row: Raffle) => {
    alert(`Editar ${row.id}`);
    closeMenu();
  };

  const handleDelete = (row: Raffle) => {
    alert(`Eliminar ${row.id}`);
    closeMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest('.menu-container')) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

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
    {
      accessorKey: 'owner',
      header: 'Dueño',
      cell: info => {
        const owner = info.getValue() as { name: string; image: string };
        return <MediaDisplay label={owner.name} image={owner.image} />;
      },
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    createCurrencyColumn('award', 'Premio'),
    createCurrencyColumn('price', 'Precio'),
    createDateColumn('drawDate', 'Fecha del sorteo'),
    {
      accessorKey: 'status',
      header: 'Estado',
      cell: info => (
        <Badge
          status={mapStatusToStatusType(info.getValue() as string)}
          label={mapStatusToLabel(info.getValue() as string)}
        />
      ),
      meta: {
        className: TABLE_CLASSES.cell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className="w-full relative menu-container">
          <ActionMenu
            isOpen={openMenuId === row.original.id}
            onToggle={() => toggleMenu(row.original.id)}
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
          />
        </div>
      ),
      meta: {
        className: TABLE_CLASSES.actionsCell,
        headerClassName: TABLE_CLASSES.header,
      },
    },
  ];

  const filteredData = useMemo(() => {
    return data.filter(
      row =>
        row.title.toLowerCase().includes(search.toLowerCase()) ||
        row.owner.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: PAGINATION_PAGE_SIZE,
      },
    },
  });

  const handlePageSizeChange = (value: number) => {
    table.setPageSize(value);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(data.map(d => d.id));
      setSelected(allIds);
    } else {
      setSelected(new Set());
    }
  };

  const handleSelectRow = (id: string) => (checked: boolean) => {
    if (checked) {
      setSelected(prev => new Set([...prev, id]));
    } else {
      setSelected(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const allSelected = selected.size === data.length && data.length > 0;

  const deleleRowsLabel = `Eliminar ${selected.size} ${
    selected.size === 1 ? 'Seleccionado' : 'Seleccionados'
  }`;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[130px]">
            <Select
              options={pageSizeOptions}
              value={String(table.getState().pagination.pageSize)}
              onChange={handlePageSizeChange}
              size="md"
            />
          </div>
          <div className="w-[240px]">
            <Input
              icon="search"
              iconPosition="left"
              placeholder="Buscar"
              inputSize="md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selected.size > 0 && (
            <Button variant="danger" size="md" className="gap-1">
              <Icon name="trash" className="text-sm" />
              {deleleRowsLabel}
            </Button>
          )}
          <Button variant="default" size="md" className="gap-1">
            <Icon name="download" className="text-sm" />
            Descargar
          </Button>
          <Button variant="primary" size="md" className="gap-1">
            <Icon name="plus" />
            Agregar
          </Button>
        </div>
      </div>

      <table className="min-w-full rounded-lg">
        <thead className="bg-base-600 rounded-lg">
          <tr>
            <th className="px-4 py-3 text-left">
              <Checkbox checked={allSelected} onChange={handleSelectAll} />
            </th>
            {table.getHeaderGroups()[0].headers.map(header => (
              <th
                key={header.id}
                className={
                  (header.column.columnDef.meta as any)?.headerClassName
                }
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b border-gray-700">
              <td className="px-4 h-14">
                <Checkbox
                  checked={selected.has(row.original.id)}
                  onChange={handleSelectRow(row.original.id)}
                />
              </td>
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className={(cell.column.columnDef.meta as any)?.className}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        rows={table.getFilteredRowModel().rows.length}
        pageCount={table.getPageCount()}
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        gotoPage={table.setPageIndex}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
      />
    </div>
  );
};

export default Table;
