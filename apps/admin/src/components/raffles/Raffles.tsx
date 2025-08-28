'use client';
import RafflesTable from './RafflesTable';
import { Breadcrumb } from '@riffy/components';
import { useRaffles } from '@riffy/hooks';

const Raffles = () => {
  const { data } = useRaffles();

  const handleEdit = (raffle: any) => {
    alert(`Editar ${raffle.id}`);
  };

  const handleDelete = (raffle: any) => {
    alert(`Eliminar ${raffle.id}`);
  };

  const handleAdd = () => {
    alert('Agregar nueva rifa');
  };

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-semibold">Rifas</h3>
        <Breadcrumb page="Lista de Rifas" />
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && (
          <RafflesTable
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

export default Raffles;
