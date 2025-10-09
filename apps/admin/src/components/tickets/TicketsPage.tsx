'use client';
import { useState, useEffect } from 'react';
import { useRaffles, useTicketsByRaffle } from '@riffy/hooks';
import { Input, Select } from '@riffy/components';
import PageHeader from '@/components/common/page-header';
import TicketBox from './ticket-box';
import TicketDetail from './ticket-detail';
import { Ticket } from '@riffy/types';

const Tickets = () => {
  const [selectedRaffleId, setSelectedRaffleId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const { data: raffles } = useRaffles();
  const { data: tickets, loading } = useTicketsByRaffle(selectedRaffleId);

  const rafflesOptions = raffles?.map(raffle => ({
    value: raffle.id,
    label: raffle.title,
  }));

  useEffect(() => {
    if (raffles && raffles.length > 0 && !selectedRaffleId) {
      setSelectedRaffleId(raffles[0].id);
    }
  }, [raffles]);

  const handleSelect = (ticket: Ticket) => {
    setIsOpen(true);
    setSelectedTicket(ticket);
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Boletos" subtitle="Lista de Boletos" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6 gap-5">
        <div className="flex justify-between items-end w-full">
          <div className="w-full sm:w-[25%]">
            <Select
              options={rafflesOptions}
              label="Selecciona una rifa"
              value={selectedRaffleId}
              onChange={setSelectedRaffleId}
              size="md"
              placeholder="Elige una rifa..."
            />
          </div>
          <div className="w-full sm:w-[25%]">
            <Input
              icon="search"
              iconPosition="left"
              placeholder="Buscar boleto"
              inputSize="md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {selectedRaffleId ? (
          <div>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              </div>
            ) : tickets && tickets.length > 0 ? (
              <div className="grid grid-cols-10 gap-2">
                {tickets
                  .filter(
                    ticket =>
                      search === '' ||
                      ticket.number
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                  )
                  .map(ticket => (
                    <TicketBox ticket={ticket} onSelect={handleSelect} />
                  ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-32 text-base-300">
                <p>No se encontraron boletos para esta rifa</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-32 text-base-300">
            <p>Selecciona una rifa para ver los boletos</p>
          </div>
        )}
      </div>
      <TicketDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        ticket={selectedTicket}
      />
    </div>
  );
};

export default Tickets;
