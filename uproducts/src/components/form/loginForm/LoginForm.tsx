'use client';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import { useFormState } from 'react-dom';
import { signInAction } from '@/app/(clientFacing)/actions/LoginActions';

function LoginForm() {
  const [error, action] = useFormState(signInAction, {});
  return (
    <form action={action} className="flex flex-col gap-3 w-full md:w-1/2 mx-auto">
      {(['email', 'password'] as const).map((el, i) => (
        <InputComponent key={`${el} + ${i}`} label={el.toUpperCase()} name={el} placeholder={`Enter your ${el}`} error={error?.[el]?.[0]} />
      ))}
      <ButtonComponent type="submit" text="login" className="w-full md:max-w-28" />
    </form>
  );
}

export default LoginForm;
