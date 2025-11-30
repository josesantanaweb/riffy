'use client';
import { useRouter } from 'next/navigation';
import { useUsers, useDeleteUser } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { User, Role } from '@riffy/types';
import OwnersTable from './table';
import PageHeader from '../common/page-header';

const OwnersPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useUsers(Role.OWNER);

  const { deleteUser } = useDeleteUser();

  const handleEdit = (user: User) => router.push(ROUTES.OWNERS.EDIT(user.id));

  const handleDelete = async (user: User) => {
    const confirm = window.confirm(
      '¿Estás seguro de querer eliminar este usuario?',
    );
    if (confirm) {
      try {
        await deleteUser(user.id);
        toast.success('Usuario eliminado exitosamente!!');
      } catch {
        toast.error('Error al eliminar el usuario.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.OWNERS.CREATE);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Dueños de Bingo" subtitle="Lista de Dueños de Bingo" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6">
        {data && (
          <OwnersTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default OwnersPage;
