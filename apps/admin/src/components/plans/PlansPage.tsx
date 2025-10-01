'use client';
import PlansTable from './table/PlansTable';
import PageHeader from '@/components/common/page-header';
import { ROUTES } from '@/constants';
import { useDeletePlan, usePlans } from '@riffy/hooks';
import { Plan } from '@riffy/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks';

const PlansPage = () => {
  const toast = useToast();
  const router = useRouter();
  const { data } = usePlans();
  const { deletePlan } = useDeletePlan();

  const handleEdit = (plan: Plan) => router.push(ROUTES.PLANS.EDIT(plan.id));

  const handleDelete = async (plan: Plan) => {
    try {
      await deletePlan(plan.id);
      toast.success('Plan eliminado exitosamente!!');
    } catch {
      toast.error('Error al eliminar el plan.');
    }
  };

  const handleAdd = () => router.push(ROUTES.PLANS.CREATE);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Planes" subtitle="Lista de Planes" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        <PlansTable
          data={data || []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
};

export default PlansPage;
