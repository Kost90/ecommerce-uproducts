import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IInput {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
}

function InputCheckout({ label, name, placeholder, defaultValue, error }: IInput) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input name={name} type="text" placeholder={placeholder} defaultValue={defaultValue} className="w-full" />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}

export default InputCheckout;
