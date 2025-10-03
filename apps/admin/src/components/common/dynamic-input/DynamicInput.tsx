'use client';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon, Input, Button } from '@riffy/components';

interface DynamicInputProps {
  name: string;
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  maxItems?: number;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  name,
  label,
  placeholder = 'Ingresa una descripción',
  isRequired = false,
  error,
  maxItems = 10,
}) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const values = watch(name) || [];

  useEffect(() => {
    if (values.length === 0) {
      setValue(name, [''], { shouldValidate: true });
    }
  }, [name, setValue, values.length]);

  const addItem = () => {
    if (values.length >= maxItems) return;
    const newValues = [...values, ''];
    setValue(name, newValues, { shouldValidate: true });
  };

  const removeItem = (index: number) => {
    if (values.length === 1) return;

    const newValues = values.filter((_: string, i: number) => i !== index);
    setValue(name, newValues, { shouldValidate: true });
  };

  const updateItem = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValue(name, newValues, { shouldValidate: true });
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-white">
          {label}
          {isRequired && <span className="text-danger-500 ml-1">*</span>}
        </label>
        <div
          onClick={addItem}
          className="flex items-center gap-2 cursor-pointer text-primary-500 text-sm"
        >
          <Icon name="plus" className="text-lg justify-center flex w-[14px]" />
          Agregar
        </div>
      </div>

      <div className="space-y-3">
        {values.map((value: string, index: number) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <Input
                placeholder={`${placeholder} ${index + 1}`}
                inputSize="md"
                value={value}
                onChange={e => updateItem(index, e.target.value)}
                error={errors[name]?.[index]?.message}
              />
            </div>
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => removeItem(index)}
              className="h-10 w-10"
              disabled={values.length === 1}
            >
              <Icon name="trash" className="text-sm" />
            </Button>
          </div>
        ))}
      </div>

      {error && <p className="text-danger-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DynamicInput;
