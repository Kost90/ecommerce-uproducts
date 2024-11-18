'use client';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface IButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
}

function ButtonComponent({ type, text }: IButtonProps) {
  const { pending } = useFormStatus();

  return <Button type="submit">{pending ? 'Loading...' : text}</Button>;
}

export default ButtonComponent;
