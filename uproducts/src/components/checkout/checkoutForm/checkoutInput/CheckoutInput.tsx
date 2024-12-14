import React, { forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IInput {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
}

export const InputCheckout = forwardRef<HTMLInputElement, IInput>(({ label, name, placeholder, defaultValue, error }: IInput, ref) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        ref={ref} // Передаем ref сюда
        name={name}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full"
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
});

InputCheckout.displayName = 'InputCheckout';
