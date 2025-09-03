'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@riffy/components';
import { cn } from '../../utils/cn';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const SELECT_SIZES = {
  sm: {
    height: 'h-9',
    padding: 'px-3',
    textSize: 'text-xs',
    iconSize: 'text-sm',
  },
  md: {
    height: 'h-10',
    padding: 'px-3',
    textSize: 'text-sm',
    iconSize: 'text-base',
  },
  lg: {
    height: 'h-12',
    padding: 'px-4',
    textSize: 'text-base',
    iconSize: 'text-xl',
  },
} as const;

const BASE_SELECT_CLASSES = [
  'border',
  'border-base-600',
  'rounded-lg',
  'bg-transparent',
  'text-base-300',
  'focus:outline-none',
  'transition-colors',
  'relative',
].join(' ');

const Select: React.FC<SelectProps> = ({
  options = [],
  value,
  onChange,
  placeholder = 'Seleccionar',
  disabled = false,
  className,
  label,
  size = 'md',
  fullWidth = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(option => option.value === value) || null,
  );
  const selectRef = useRef<HTMLDivElement>(null);

  const sizeConfig = SELECT_SIZES[size];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const option = options.find(option => option.value === value);
    setSelectedOption(option || null);
  }, [value, options]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange?.(option.value);
  };

  const selectClasses = [
    BASE_SELECT_CLASSES,
    sizeConfig.height,
    sizeConfig.padding,
    sizeConfig.textSize,
    fullWidth ? 'w-full' : 'w-auto',
    disabled && 'opacity-50 cursor-not-allowed',
    !disabled && 'cursor-pointer hover:border-base-500',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={selectRef}
      className={cn('relative gap-2 flex flex-col', fullWidth && 'w-full')}
    >
      <label className="text-white text-sm">{label}</label>
      <div
        className={selectClasses}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className="flex items-center justify-between w-full h-full">
          <span className="text-base-300">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Icon name="chevron-down" className={sizeConfig.iconSize} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-1 bg-base-700 border border-base-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-base-300 text-sm">
                No hay opciones disponibles
              </div>
            ) : (
              options.map((option, index) => (
                <div
                  key={index}
                  className={cn(
                    'px-3 py-2 cursor-pointer text-sm transition-colors text-base-300',
                    'hover:bg-base-600 hover:text-white',
                    selectedOption?.value === option.value &&
                      'bg-base-600 text-base-300',
                    'first:rounded-t-lg last:rounded-b-lg',
                  )}
                  onClick={() => handleOptionClick(option)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleOptionClick(option);
                    }
                  }}
                >
                  {option.label}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
