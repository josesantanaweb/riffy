'use client';
import React from 'react';
import type { ReactElement } from 'react';
import { Input } from '@riffy/components';

interface SearchProps {
  placeholder?: string;
  isRequired?: boolean;
  value: string;
  error?: string;
  loading: boolean;
  onClick: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
  placeholder = 'Cédula de identidad',
  isRequired = true,
  value,
  error,
  loading,
  onClick,
  onChange,
}: SearchProps): ReactElement => {
  const icon = loading ? (
    <div className="animate-spin">
      <span className="icon-spinner" />
    </div>
  ) : (
    'search'
  );

  return (
    <Input
      placeholder={placeholder}
      isRequired={isRequired}
      value={value}
      error={error}
      iconPosition="right"
      icon={icon}
      onIconClick={onClick}
      onChange={onChange}
    />
  );
};

export default Search;
