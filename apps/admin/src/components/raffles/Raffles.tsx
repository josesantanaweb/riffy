'use client';
import Table from './table';
import { Breadcrumb } from '@riffy/components';
import { useRaffles } from '@riffy/hooks';

const Raffles = () => {
  const { data } = useRaffles();

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-semibold">Rifas</h3>
        <Breadcrumb page="Lista de Rifas" />
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && <Table data={data} />}
      </div>
    </div>
  );
};

export default Raffles;
