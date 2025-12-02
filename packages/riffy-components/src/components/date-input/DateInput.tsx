'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Input, Select } from '@riffy/components';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface DateInputProps {
  label?: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  showTime?: boolean;
}

const DateInput = ({
  label,
  date,
  setDate,
  showTime = false,
}: DateInputProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);
  const [hour, setHour] = useState<string>(
    date ? String(date.getHours()).padStart(2, '0') : '00',
  );
  const [minute, setMinute] = useState<string>(
    date ? String(date.getMinutes()).padStart(2, '0') : '00',
  );

  const hourOptions = Array.from({ length: 24 }, (_, i) => ({
    value: String(i).padStart(2, '0'),
    label: String(i).padStart(2, '0'),
  }));

  const minuteOptions = Array.from({ length: 60 }, (_, i) => ({
    value: String(i).padStart(2, '0'),
    label: String(i).padStart(2, '0'),
  }));

  useEffect(() => {
    if (date && !isNaN(date.getTime())) {
      setSelectedDate(date);
      setHour(String(date.getHours()).padStart(2, '0'));
      setMinute(String(date.getMinutes()).padStart(2, '0'));
    }
  }, [date]);

  const combineDateAndTime = (
    baseDate: Date | undefined,
    h: string,
    m: string,
  ): Date | undefined => {
    if (!baseDate) return undefined;

    const newDate = new Date(baseDate);
    newDate.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
    return newDate;
  };

  const handleDateSelect = (selected: Date | undefined) => {
    if (selected) {
      setSelectedDate(selected);
      const combinedDate = combineDateAndTime(selected, hour, minute);
      setDate(combinedDate);
    }
  };

  const handleHourChange = (h: string) => {
    setHour(h);
    if (selectedDate) {
      const combinedDate = combineDateAndTime(selectedDate, h, minute);
      setDate(combinedDate);
    }
  };

  const handleMinuteChange = (m: string) => {
    setMinute(m);
    if (selectedDate) {
      const combinedDate = combineDateAndTime(selectedDate, hour, m);
      setDate(combinedDate);
    }
  };

  const formattedDate =
    date && !isNaN(date.getTime())
      ? showTime
        ? format(date, 'dd/MM/yyyy HH:mm', { locale: es })
        : format(date, 'dd/MM/yyyy', { locale: es })
      : '';

  const handleOpen = () => setOpen(!open);

  return (
    <div className="relative w-full">
      <Input
        label={label}
        value={formattedDate}
        placeholder={
          showTime ? 'Selecciona fecha y hora' : 'Selecciona una fecha'
        }
        iconPosition="right"
        inputSize="md"
        onClick={handleOpen}
      />

      {open && (
        <div className="absolute z-50 mt-2 p-4 rounded-lg border border-input-border bg-box-primary shadow-lg text-gray-300">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
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

          {showTime && (
            <div className="mt-4 pt-4 border-t border-input-border flex gap-3">
              <div className="flex-1">
                <Select
                  label="Hora"
                  options={hourOptions}
                  value={hour}
                  onChange={handleHourChange}
                  size="md"
                />
              </div>
              <div className="flex-1">
                <Select
                  label="Minutos"
                  options={minuteOptions}
                  value={minute}
                  onChange={handleMinuteChange}
                  size="md"
                />
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;
