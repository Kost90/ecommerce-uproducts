'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface IButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  className?: string;
}

function ButtonComponent({ type = 'submit', text, className }: IButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type={type} className={className}>
      {pending ? 'Loading...' : text}
    </Button>
  );
}

export default ButtonComponent;
