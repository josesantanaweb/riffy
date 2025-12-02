'use client';
import { useState, useEffect } from 'react';
import { useRaffles, useTicketsByRaffle } from '@riffy/hooks';
import { Input, Select } from '@riffy/components';
import PageHeader from '@/components/common/page-header';
import TicketDetail from './ticket-detail';
import { Ticket, TicketStatus } from '@riffy/types';
import TicketsGrid from './tickets-grid';
import TicketsFooter from './tickets-footer';
import { useTickets } from '@/hooks';

const Tickets = () => {
  const [selectedRaffleId, setSelectedRaffleId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const { data: raffles } = useRaffles();
  const { data: tickets, loading } = useTicketsByRaffle(selectedRaffleId);

  const {
    currentTickets,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    totalTickets,
  } = useTickets({
    tickets,
    ticketsPerPage: 50,
  });

  const rafflesOptions = raffles?.map(raffle => ({
    value: raffle.id,
    label: raffle.title,
  }));

  useEffect(() => {
    if (raffles && raffles.length > 0 && !selectedRaffleId) {
      setSelectedRaffleId(raffles[0].id);
    }
  }, [raffles, selectedRaffleId]);

  const handleSelect = (ticket: Ticket) => {
    if (ticket.status != TicketStatus.AVAILABLE ) {
      setIsOpen(true);
      setSelectedTicket(ticket);
    }
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Boletos" subtitle="Lista de Boletos" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6 gap-5">
        <div className="flex justify-between items-end w-full flex-col md:flex-row gap-3 md:gap-0">
          <div className="w-full md:w-[25%]">
            <Select
              options={rafflesOptions}
              label="Selecciona una rifa"
              value={selectedRaffleId}
              onChange={setSelectedRaffleId}
              size="md"
              placeholder="Elige una rifa..."
            />
          </div>
          <div className="w-full md:w-[25%]">
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

        <TicketsGrid
          tickets={currentTickets}
          loading={loading}
          onSelect={handleSelect}
          search={search}
        />

        <TicketsFooter
          currentPage={currentPage}
          totalPages={totalPages}
          totalTickets={totalTickets}
          onPrevPage={prevPage}
          onNextPage={nextPage}
        />
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
