'use client';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@riffy/components';
import { useUsers, useDeleteRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { User, Role } from '@riffy/types';
import OwnersTable from './OwnersTable';

const Owners = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useUsers(Role.OWNER);

  // const { deleteUser } = useDeleteRaffle();

  const handleEdit = (raffle: User) =>
    router.push(ROUTES.RAFFLES.EDIT(raffle.id));

  const handleView = (raffle: User) =>
    router.push(ROUTES.TICKETS.LIST(raffle.id));

  const handleDelete = async (raffle: User) => {
    // try {
    //   await deleteUser(raffle.id);
    //   toast.success('Rifa eliminada exitosamente!!');
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Error al eliminar la rifa.');
    // }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-semibold">Dueños</h3>
        <Breadcrumb page="Lista de Dueños" />
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && (
          <OwnersTable
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

export default Owners;
