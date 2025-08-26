'use client';
import Image from 'next/image';
import { IconCalendar, IconFilter, IconGift, IconSearch } from '@/icons';
import TicketGrid from '@/components/TicketGrid';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleNext = () => {
    router.push('/pay');
  };
  return (
    <div className="h-full w-full">
      <Image
        src="/static/images/car.png"
        alt=""
        height={400}
        width={440}
        quality={100}
        objectFit="cover"
        className="w-full max-h-[400px] max-w-[440px] mx-auto"
      />
      <div className="w-full max-w-[440px] flex flex-col items-center gap-4 px-4 py-4 mx-auto">
        <div className="text-white font-bold text-[22px] w-full border-b border-tertiary-1 mb-2 pb-4">
          Rifa del dia del padre
        </div>
        <div className="bg-gradient-to-r from-primary-1/10 to-primary-2/10 w-full h-[50px] rounded-[10px] flex items-center gap-2 text-primary-1 text-sm font-medium px-4">
          <IconCalendar size={20} />
          20 de Agosto de 2025
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="text-primary-1 font-medium text-sm">
            50% Completado
          </div>
          <div className="text-success-1 font-medium text-sm">
            5000 Ticket Disponibles
          </div>
        </div>
        <div className="h-[15px] rounded-[10px] bg-tertiary-2/50 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-2 to-primary-1 rounded-[10px] w-[50%]">
            <div className="h-6 w-6 rounded-full bg-primary-1 absolute -translate-y-1/2 top-1/2 right-0"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold text-base">
              Lista de Tickets
            </div>
            <div className="text-gray-2 font-medium text-sm">
              Numeros en gris no disponibles
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold text-base">
              Precio del ticket
            </div>
            <div className="text-gray-2 font-bold text-sm">BS 100,00</div>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-between w-full">
          <div className="text-white font-semibold text-sm">
            Filtra por: <span className="text-gray-2">Todos</span>
          </div>
          <div className="text-success-1 font-medium text-sm flex items-center gap-2">
            Ordenar por:{' '}
            <span className="text-gray-2">
              <IconFilter size={20} />
            </span>
          </div>
        </div>
        {/* Ticket Grid with Pagination */}
        <TicketGrid />
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 text-white text-base font-medium">
            <IconGift size={20} />
            Ver Premios
          </div>
          <div className="flex items-center gap-2 text-white text-base font-medium">
            <IconSearch size={20} />
            Mis Boletos
          </div>
        </div>
        <Button
          variant="filled"
          size="md"
          className="w-full !mb-14"
          label="Siguiente"
          onClick={handleNext}
        />
      </div>
    </div>
  );
}
