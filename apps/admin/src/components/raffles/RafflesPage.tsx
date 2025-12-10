'use client';
import RafflesTable from './table/RafflesTable';
import { useRouter } from 'next/navigation';
import { useRaffles, useDeleteRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { Raffle } from '@riffy/types';
import PageHeader from '../common/page-header';
import * as XLSX from 'xlsx';
import { formatCurrency, formatDate } from '@riffy/utils';
import { mapRaffleStatusToLabel } from '@/utils';

const RafflesPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useRaffles();
  const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (raffle: Raffle) =>
    router.push(ROUTES.RAFFLES.EDIT(raffle.id));

  const handleView = () => router.push(ROUTES.TICKETS.LIST);

  const handleDelete = async (raffle: Raffle) => {
    const confirm = window.confirm('¿Estás seguro de querer eliminar esta rifa?');
    if (confirm) {
      try {
        await deleteRaffle(raffle.id);
        toast.success('Rifa eliminada exitosamente!!');
      } catch {
        toast.error('Error al eliminar la rifa.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    if (!data || data.length === 0) {
      toast.error('No hay datos para descargar');
      return;
    }

    try {
      const excelData = data.map((raffle) => ({
        ID: raffle.id.slice(15, 25).toUpperCase(),
        Título: raffle.title,
        Precio: formatCurrency(raffle.price, 'VES'),
        Premio: formatCurrency(raffle.award || 0, 'VES'),
        'Total Tickets': raffle.totalTickets,
        Vendidos: raffle.sold || 0,
        Disponibles: raffle.available || 0,
        Progreso: raffle.progress ? `${raffle.progress.toFixed(2)}%` : '0%',
        'Fecha de Sorteo': raffle.drawDate ? formatDate(raffle.drawDate) : 'N/A',
        Estado: mapRaffleStatusToLabel(raffle.status || ''),
        Dueño: raffle.owner?.name || 'N/A',
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Rifas');

      const columnWidths = [
        { wch: 12 },
        { wch: 30 },
        { wch: 15 },
        { wch: 15 },
        { wch: 12 },
        { wch: 10 },
        { wch: 12 },
        { wch: 10 },
        { wch: 15 },
        { wch: 12 },
        { wch: 20 },
      ];
      worksheet['!cols'] = columnWidths;

      const fileName = `rifas_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      toast.success('Archivo descargado exitosamente');
    } catch {
      toast.error('Error al descargar el archivo');
    }
  };

  return (
    <div className="py-6 px-3 lg:px-6 flex-col flex gap-6">
      <PageHeader title="Rifas" subtitle="Lista de Rifas" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6">
        {data && (
          <RafflesTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default RafflesPage;
