'use client';
import { useRouter } from 'next/navigation';
import { useUsers, useDeleteUser } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { User, Role } from '@riffy/types';
import OwnersTable from './owners-table/OwnersTable';
import PageHeader from '../common/page-header';

const OwnersPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useUsers(Role.OWNER);

  const { deleteUser } = useDeleteUser();

  const handleEdit = (user: User) => router.push(ROUTES.OWNERS.EDIT(user.id));

  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user.id);
      toast.success('Usuario eliminado exitosamente!!');
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar el usuario.');
    }
  };

  const handleAdd = () => router.push(ROUTES.OWNERS.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Dueños de Rifa" subtitle="Lista de Dueños de Rifa" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && (
          <OwnersTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default OwnersPage;
