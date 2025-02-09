'use client';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import { useFormState } from 'react-dom';
import { signInAction } from '@/app/(clientFacing)/actions/LoginActions';
import { NavLink } from '@/components/NavLink/Nav';

function LoginForm() {
  const [state, action] = useFormState(signInAction, {
    errors: {},
    serverError: undefined,
  });

  // TODO: Change for Form component
  return (
    <form action={action} className="flex flex-col gap-3 w-full md:w-1/2 mx-auto">
      {(['email', 'password'] as const).map((el, i) => (
        <InputComponent
          key={`${el} + ${i}`}
          label={el.toUpperCase()}
          name={el}
          type={el === 'password' ? 'password' : 'text'}
          placeholder={`Enter your ${el}`}
          error={state?.errors?.[el]?.[0]}
        />
      ))}

      {state?.serverError && <p className="text-red-500 text-center">{state.serverError}</p>}

      <NavLink href={'/register'} className="text-orange hover:text-black font-normal text-xs p-0">
        Create account
      </NavLink>

      <ButtonComponent type="submit" text="login" className="w-full md:max-w-28" />
    </form>
  );
}

export default LoginForm;
