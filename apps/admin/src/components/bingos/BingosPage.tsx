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
    router.push(ROUTES.BINGOS.EDIT(bingo.id));

  const handleView = () => router.push(ROUTES.BINGOS.LIST);

  const handleDelete = async (bingo: Bingo) => {
    const confirm = window.confirm('¿Estás seguro de querer eliminar este bingo?');
    if (confirm) {
      try {
        await deleteBingo(bingo.id);
        toast.success('Bingo eliminado exitosamente!!');
      } catch {
        toast.error('Error al eliminar el bingo.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.BINGOS.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Bingos" subtitle="Lista de Bingos" />
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
