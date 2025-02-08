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

export const InputComponent = forwardRef<HTMLInputElement, IInput>(({ label, name, placeholder, defaultValue, error }: IInput, ref) => {
  return (
    // ! ref this is for motin animation
    <div ref={ref}>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type="text" placeholder={placeholder} defaultValue={defaultValue} className="w-full" />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
});

InputComponent.displayName = 'InputComponent';
