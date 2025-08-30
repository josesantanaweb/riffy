'use client';
import { Breadcrumb, Button, Icon } from '@riffy/components';
import FormInformation from './form/FormInformation';
import FormImages from './form/FormImages';

const CreateRaffle = () => {

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-semibold">Rifas</h3>
          <Breadcrumb page="Crear Rifa" />
        </div>
        <Button size="md">
          <Icon name="arrow-back" />
          Volver
        </Button>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <FormInformation />

        <FormImages />

        <div className="flex items-center justify-end gap-3">
          <Button variant="default" size="md">
            Cancelar
          </Button>
          <Button variant="primary" size="md">
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffle;
