'use client';

import { useState, useEffect } from 'react';

import { InputBase } from '@/components/ui/input-base';
import { MaterialIcon } from '@/components/ui/material-icon';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  value?: string;
  // Called when user presses Enter (immediate search)
  onSearch?: (value: string) => void;
  // Called on every change (use with debounce)
  onChangeSearch?: (value: string) => void;
}

export function SearchInput({
  placeholder = 'Search',
  className = '',
  value,
  onSearch,
  onChangeSearch,
  ...rest
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value || '');

  // Sync with external value prop
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(e.currentTarget.value);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setInputValue(newValue);
    onChangeSearch?.(newValue);
  };

  const handleClear = () => {
    setInputValue('');
    onChangeSearch?.('');
    onSearch?.('');
  };

  const showCloseIcon = inputValue.length > 0;

  return (
    <div className={`relative ${className}`}>
      <MaterialIcon
        icon="search"
        className="text-neutral-low-label absolute top-1/2 left-3 h-6 w-6 -translate-y-1/2"
      />
      <InputBase
        placeholder={placeholder}
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className={`placeholder:text-icon-secondary w-[306px] rounded-[8px] pl-11 ${
          showCloseIcon ? 'pr-8' : 'pr-4'
        }`}
        {...rest}
      />

      {showCloseIcon && (
        <MaterialIcon
          icon="close"
          className="text-icon-secondary hover:text-neutral-low-pure absolute top-1/2 right-3 h-6 w-6 -translate-y-1/2 cursor-pointer transition-colors"
          onClick={handleClear}
        />
      )}
    </div>
  );
}
