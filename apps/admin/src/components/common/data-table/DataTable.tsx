'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Badge,
  Checkbox,
  Button,
  Icon,
  Input,
  Select,
} from '@riffy/components';
import type { IconName } from '@riffy/components';
import ActionMenu from '@/components/common/action-menu';
import Pagination from '@/components/common/pagination';
import { PAGINATION_PAGE_SIZE } from '@/constants';
import { DataTableProps } from './types';

const defaultPageSizeOptions = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  buttons = [],
  searchFields = [],
  searchPlaceholder = 'Buscar...',
  enableSelection = true,
  enablePagination = true,
  pageSizeOptions = defaultPageSizeOptions,
  initialPageSize = PAGINATION_PAGE_SIZE,
}: DataTableProps<T>) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState<string>('');

  const columnsWithActions = useMemo(() => {
    const baseColumns = [...columns];

    if (actions.length > 0) {
      baseColumns.push({
        id: 'actions',
        header: 'Acciones',
        cell: ({ row }) => (
          <div className="w-full relative menu-container">
            <ActionMenu
              actions={actions}
              row={row.original}
            />
          </div>
        ),
        meta: {
          className: 'px-4 h-14',
          headerClassName:
            'px-4 py-3 text-left font-medium text-base-200 text-sm',
        },
      });
    }

    return baseColumns;
  }, [columns, actions]);

  const filteredData = useMemo(() => {
    if (!search || searchFields.length === 0) return data;

    return data.filter(row =>
      searchFields.some(field => {
        const value = row[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(search.toLowerCase());
        }
        if (typeof value === 'object' && value?.name) {
          return value.name.toLowerCase().includes(search.toLowerCase());
        }
        return false;
      }),
    );
  }, [data, search, searchFields]);

  const table = useReactTable({
    data: filteredData,
    columns: columnsWithActions,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    initialState: {
      pagination: {
        pageSize: initialPageSize,
      },
    },
  });

  const handlePageSizeChange = (value: string) => {
    table.setPageSize(Number(value));
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {enablePagination && (
            <div className="w-[130px]">
              <Select
                options={pageSizeOptions}
                value={String(table.getState().pagination.pageSize)}
                onChange={handlePageSizeChange}
                size="md"
              />
            </div>
          )}
          {searchFields.length > 0 && (
            <div className="w-[240px]">
              <Input
                icon="search"
                iconPosition="left"
                placeholder={searchPlaceholder}
                inputSize="md"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {enableSelection && selected.size > 0 && (
            <Button variant="danger" size="md" className="gap-1">
              <Icon name="trash" className="text-sm" />
              Eliminar {selected.size}{' '}
              {selected.size === 1 ? 'Seleccionado' : 'Seleccionados'}
            </Button>
          )}
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size="md"
              className="gap-1"
              onClick={button.onClick}
            >
              {button.icon && (
                <Icon
                  name={button.icon as IconName}
                  className={`${button.icon === 'plus' ? 'text-lg' : 'text-sm'}`}
                />
              )}
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <table className="min-w-full rounded-lg">
        <thead className="bg-base-600 rounded-lg">
          <tr>
            {enableSelection && (
              <th className="px-4 py-3 text-left">
                <Checkbox checked={allSelected} onChange={handleSelectAll} />
              </th>
            )}
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
              {enableSelection && (
                <td className="px-4 h-14">
                  <Checkbox
                    checked={selected.has(row.original.id)}
                    onChange={handleSelectRow(row.original.id)}
                  />
                </td>
              )}
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

      {enablePagination && (
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
      )}
    </div>
  );
};

export default DataTable;
