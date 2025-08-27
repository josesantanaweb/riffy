'use client';
import React, { useState, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';

import {
  createColumn,
  createCurrencyColumn,
  createDateColumn,
  TABLE_CLASSES,
  mapStatusToStatusType,
  mapStatusToLabel,
} from '../utils';
import Badge from '../../common/badge';
import MediaDisplay from '../../common/media-display';

type Raffles = {
  id: string;
  title: string;
  image: string;
  customer: {
    name: string;
    image: string;
  };
  award: number;
  price: number;
  date?: string;
  status?: string;
};

const data: Raffles[] = [
  {
    id: '2BA12213',
    title: 'Dia del padre',
    image: '/images/banner.png',
    customer: {
      name: 'Ganaconriffy',
      image: '/images/customer.png',
    },
    award: 100.5,
    price: 10.0,
    date: '2025-08-22',
    status: 'COMPLETED',
  },
  {
    id: '2BA12214',
    title: 'Dia de la madre',
    image: '/images/banner.png',
    customer: {
      name: 'Ganaconriffy',
      image: '/images/customer.png',
    },
    award: 250.75,
    price: 15.5,
    date: '2025-05-14',
    status: 'COMPLETED',
  },
  {
    id: '2BA12215',
    title: 'Dia del niño',
    image: '/images/banner.png',
    customer: {
      name: 'Ganaconriffy',
      image: '/images/customer.png',
    },
    award: 75.25,
    price: 5.25,
    date: '2025-04-30',
    status: 'ACTIVE',
  },
  {
    id: '2BA12216',
    title: 'Navidad',
    image: '/images/banner.png',
    customer: {
      name: 'Ganaconriffy',
      image: '/images/customer.png',
    },
    award: 500.0,
    price: 25.0,
    date: '2025-12-25',
    status: 'ACTIVE',
  },
  {
    id: '2BA12217',
    title: 'Año Nuevo',
    image: '/images/banner.png',
    customer: {
      name: 'Ganaconriffy',
      image: '/images/customer.png',
    },
    award: 1000.0,
    price: 50.0,
    date: '2025-12-31',
    status: 'COMPLETED',
  },
];

const handleEdit = (row: Raffles) => {
  alert(`Editar ${row.id}`);
};

const handleDelete = (row: Raffles) => {
  alert(`Eliminar ${row.id}`);
};

const columns: ColumnDef<Raffles>[] = [
  createColumn('id', 'ID'),
  {
    accessorKey: 'title',
    header: 'Titulo',
    cell: info => {
      const row = info.row.original;
      return <MediaDisplay label={row.title} image={row.image} />;
    },
    meta: {
      className: TABLE_CLASSES.cell,
      headerClassName: TABLE_CLASSES.header,
    },
  },
  {
    accessorKey: 'customer',
    header: 'Cliente',
    cell: info => {
      const customer = info.getValue() as { name: string; image: string };
      return <MediaDisplay label={customer.name} image={customer.image} />;
    },
    meta: {
      className: TABLE_CLASSES.cell,
      headerClassName: TABLE_CLASSES.header,
    },
  },
  createCurrencyColumn('award', 'Premio'),
  createCurrencyColumn('price', 'Precio'),
  createDateColumn('date', 'Fecha del sorteo'),
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
      <div className="flex gap-2">
        <button onClick={() => handleEdit(row.original)}>
          <span className="text-base-300 hover:text-primary-600">Editar</span>
        </button>
        <button onClick={() => handleDelete(row.original)}>
          <span className="text-base-300 hover:text-red-500">Eliminar</span>
        </button>
      </div>
    ),
    meta: {
      className: TABLE_CLASSES.actionsCell,
      headerClassName: TABLE_CLASSES.header,
    },
  },
];

const Table = () => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        const allIds = new Set(data.map(d => d.id));
        setSelected(allIds);
      } else {
        setSelected(new Set());
      }
    },
    [data],
  );

  const handleSelectRow = useCallback(
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelected(prev => new Set([...prev, id]));
      } else {
        setSelected(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    },
    [],
  );

  const allSelected = selected.size === data.length && data.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <table className="min-w-full rounded-lg">
        <thead className="bg-base-600 rounded-lg">
          <tr>
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                aria-label="Seleccionar todos"
              />
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
                <input
                  type="checkbox"
                  checked={selected.has(row.original.id)}
                  onChange={handleSelectRow(row.original.id)}
                  aria-label={`Seleccionar ${row.original.id}`}
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
      <div className="flex w-full justify-between items-center">
        <p className="text-white text-sm">Mostrando 10 de 26 Resultados</p>
        <div className="flex items-center gap-3">
          <button className="text-base-200 bg-base-600 w-10 h-10 rounded-lg flex items-center justify-center text-sm">
            1
          </button>
          <button className="text-base-200 bg-base-600 w-10 h-10 rounded-lg flex items-center justify-center text-sm">
            2
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
