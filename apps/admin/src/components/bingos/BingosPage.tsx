'use client';
import BingosTable from './table/BingosTable';
import { useRouter } from 'next/navigation';
import { useBingos, useDeleteBingo } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { Bingo } from '@riffy/types';
import PageHeader from '../common/page-header';

const BingosPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useBingos();
  const { deleteBingo } = useDeleteBingo();

  const handleEdit = (bingo: Bingo) =>
    router.push(ROUTES.RAFFLES.EDIT(bingo.id));

  const handleView = () => router.push(ROUTES.TICKETS.LIST);

  const handleDelete = async (bingo: Bingo) => {
    const confirm = window.confirm('¿Estás seguro de querer eliminar esta rifa?');
    if (confirm) {
      try {
        await deleteBingo(bingo.id);
        toast.success('Rifa eliminada exitosamente!!');
      } catch {
        toast.error('Error al eliminar la rifa.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Rifas" subtitle="Lista de Rifas" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6">
        {data && (
          <BingosTable
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

export default BingosPage;
