'use client';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import { useFormState } from 'react-dom';
import { signUpUser } from '@/app/(clientFacing)/actions/registerActions';

function RegisterForm() {
  const [state, action] = useFormState(signUpUser, {
    errors: {},
    serverError: undefined,
  });
  return (
    <form action={action} className="flex flex-col gap-3 w-full md:w-1/2 mx-auto">
      {(['firstname', 'lastname', 'email', 'password', 'telephone'] as const).map((el, i) => (
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
      <ButtonComponent type="submit" text="Send" className="w-full md:max-w-28" />
    </form>
  );
}

export default RegisterForm;
