// import React from 'react';

// interface IFormProps<T> {
//   children: React.ReactNode;
//   action: (payload: FormData) => T;
//   className: string;
// }

// function Form<T extends string | ((formData: FormData) => void | Promise<void>) | undefined>({
//   children,
//   action,
//   className,
// }: IFormProps<T>) {
//   return (
//     <form action={action} className={className}>
//       {children}
//     </form>
//   );
// }

// export default Form;
import React from 'react';

interface IFormProps {
  children: React.ReactNode;
  action: (payload: FormData) => void | Promise<void>;
  className?: string;
}

function Form({ children, action, className }: IFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    action(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}

export default Form;
