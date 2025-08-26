import React, { useState } from 'react';

const ticketOptions = [2, 5, 10, 15];

export default function TicketSelector() {
  const [selected, setSelected] = useState(2);

  const handleOption = (n: number) => setSelected(n);
  const handleMinus = () => setSelected(n => (n > 2 ? n - 1 : n));
  const handlePlus = () => setSelected(n => (n < 99 ? n + 1 : n));

  return (
    <div className="w-full flex flex-col gap-4 items-center my-5">
      <div className="flex gap-4 w-full justify-center">
        {ticketOptions.map(n => (
          <button
            key={n}
            className={`rounded-[10px] px-4 py-2 font-semibold text-sm transition-colors ${
              selected === n
                ? 'bg-primary-1 text-white shadow-lg'
                : 'bg-tertiary-1 text-gray-2'
            }`}
            onClick={() => handleOption(n)}
          >
            {n} Tickets
          </button>
        ))}
      </div>
      <div className="flex gap-4 w-full justify-center items-center">
        <button
          className="w-16 h-16 rounded-[10px] bg-tertiary-1 text-white text-3xl flex items-center justify-center"
          onClick={handleMinus}
        >
          –
        </button>
        <div className="flex-1 h-16 rounded-[10px] bg-tertiary-1 flex items-center justify-center text-white text-base font-semibold">
          {selected}
        </div>
        <button
          className="w-16 h-16 rounded-[10px] bg-tertiary-1 text-white text-3xl flex items-center justify-center"
          onClick={handlePlus}
        >
          +
        </button>
      </div>
    </div>
  );
}
