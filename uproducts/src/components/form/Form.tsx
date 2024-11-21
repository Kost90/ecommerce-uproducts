import React from 'react';

interface IFormProps<T> {
  children: React.ReactNode;
  action: (payload: FormData) => T;
  className: string;
}

function Form<T>({ children, action, className }: IFormProps<T>) {
  return (
    <form action={action} className={className}>
      {children}
    </form>
  );
}

export default Form;
