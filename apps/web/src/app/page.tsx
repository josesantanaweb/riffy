'use client';
import Image from 'next/image';
import { IconCalendar, IconFilter, IconGift, IconSearch } from '@/icons';
import TicketGrid from '@/components/TicketGrid';
import TicketSelector from '@/components/TicketSelector';
import { useRaffles } from '@riffy/hooks';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

type Ticket = {
  id: string;
  number: string;
  status: string;
};

type Raffle = {
  id: string;
  title: string;
  price: number;
  totalTickets: number;
  status: string;
  banner?: string;
  primaryColor?: string;
  tickets?: Ticket[];
};

export default function Home() {
  //   {
  //   "data": {
  //     "createRaffle": {
  //       "id": "cmewdux2z00011r09e5udwy0s",
  //       "title": "Rifa de prueba",
  //       "description": "Primera rifa creada desde Playground",
  //       "totalTickets": 100,
  //       "price": 5,
  //       "drawDate": "2025-09-10T00:00:00.000Z",
  //       "createdAt": "2025-08-29T05:19:17.995Z"
  //     }
  //   }8
  // }
  const router = useRouter();
  const [isSelectedTicket, setIsSelectedTicket] = useState(false);

  const { data: raffles, loading, error } = useRaffles();
  console.log('raffles', raffles);

  if (!loading && !error && !raffles) {
    console.error(
      'useRaffles returned null raffles — check Apollo client URL and that the API returns raffles',
    );
  }
  const activeRaffle =
    raffles?.find((r: Raffle) => r.status === 'ACTIVE') ?? raffles?.[0] ?? null;

  const handleNext = () => {
    router.push('/pay');
  };

  if (loading)
    return (
      <div className="h-full w-full flex items-center justify-center text-white">
        Cargando rifas...
      </div>
    );
  if (error)
    return (
      <div className="h-full w-full flex items-center justify-center text-warning-1">
        Error cargando rifas
      </div>
    );
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
      <div className="w-full max-w-[440px] flex flex-col items-center gap-5 px-4 py-4 mx-auto">
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
        <div className="flex items-center gap-2 justify-between w-full mt-4">
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold text-base">
              Lista de Tickets
            </div>
            <div className="text-gray-2 font-medium text-sm">
              Numeros en gris no disponibles
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-white font-semibold text-base">
              Precio del ticket
            </div>
            <div className="text-primary-1 font-bold text-sm">BS 100,00</div>
          </div>
        </div>
        {isSelectedTicket ? <TicketGrid /> : <TicketSelector />}
        <div className="flex items-center justify-between gap-2 w-full my-4">
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
