'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Input } from '@riffy/components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DateInputProps {
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DateInput = ({ label, date, setDate }: DateInputProps) => {
  const [open, setOpen] = useState(false);

  const formattedDate =
    date && !isNaN(date.getTime())
      ? format(date, 'dd/MM/yyyy', { locale: es })
      : '';

  const handleOpen = () => setOpen(!open);

  return (
    <div className="relative w-full">
      <Input
        label={label}
        value={formattedDate}
        placeholder="Selecciona una fecha"
        iconPosition="right"
        inputSize="md"
        onClick={handleOpen}
      />

      {open && (
        <div className="absolute z-50 mt-2 p-4 rounded-lg border border-input-border bg-box-primary shadow-lg text-gray-300">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={date => {
              setDate(date);
              setOpen(false);
            }}
            locale={es}
            disabled={{ before: new Date() }}
            classNames={{
              chevron: 'fill-body-100',
              month: 'text-body-100',
              disabled: 'hover:bg-transparent hover:text-body-100',

              caption_label: 'text-lg font-medium text-white capitalize',

              day: 'rounded-md hover:bg-box-secondary text-body-100',
            }}
            modifiersClassNames={{
              selected: 'bg-box-secondary text-white',
              today: 'bg-primary-500 text-white',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
