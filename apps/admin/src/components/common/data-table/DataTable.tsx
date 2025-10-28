'use client';
import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Pagination,
  Checkbox,
  Button,
  Icon,
  Input,
  Select,
} from '@riffy/components';
import type { IconName } from '@riffy/components';
import ActionMenu from '@/components/common/action-menu';
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
            <ActionMenu actions={actions} row={row.original} />
          </div>
        ),
        meta: {
          className: 'px-4 h-14',
          headerClassName:
            'px-4 py-3 text-left font-medium text-body-100 text-sm',
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
    data: filteredData || [],
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

  const allSelected = selected.size === data?.length && data.length > 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {enablePagination && (
            <div className="w-full sm:w-[130px] min-w-[130px]">
              <Select
                options={pageSizeOptions}
                value={String(table.getState().pagination.pageSize)}
                onChange={handlePageSizeChange}
                size="md"
              />
            </div>
          )}
          {searchFields.length > 0 && (
            <div className="w-full sm:w-[240px] min-w-[200px]">
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
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between lg:justify-end">
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
                  className={`${button.icon === 'plus' ? 'text-lg text-center w-[14px] flex justify-center' : 'text-sm'}`}
                />
              )}
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden rounded-lg border border-line-100">
            <table className="min-w-full divide-y divide-line-100">
              <thead className="bg-table-header-bg">
                <tr>
                  {enableSelection && (
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      <Checkbox
                        checked={allSelected}
                        onChange={handleSelectAll}
                      />
                    </th>
                  )}
                  {table.getHeaderGroups()[0].headers.map(header => (
                    <th
                      key={header.id}
                      className={`px-4 py-3 text-left whitespace-nowrap ${
                        (header.column.columnDef.meta as any)
                          ?.headerClassName || ''
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      ) as React.ReactNode}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-table-body-bg divide-y divide-line-100">
                {table.getRowModel().rows.map(row => (
                  <tr
                    key={row.id}
                    className="hover:bg-box-secondary transition-colors"
                  >
                    {enableSelection && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Checkbox
                          checked={selected.has(row.original.id)}
                          onChange={handleSelectRow(row.original.id)}
                        />
                      </td>
                    )}
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={`px-4 py-3 whitespace-nowrap ${
                          (cell.column.columnDef.meta as any)?.className || ''
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        ) as React.ReactNode}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
