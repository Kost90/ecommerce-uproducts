'use client';
import { startTransition } from 'react';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import { useFormState } from 'react-dom';
import { signInAction } from '@/app/(clientFacing)/actions/LoginActions';
import { NavLink } from '@/components/NavLink/Nav';
import { useRouter } from 'next/navigation';
// import { useLoginMutation } from '@/lib/redux/apiSlice/apiSlice';
import { useEffect } from 'react';

function LoginForm() {
  const router = useRouter();
  // const [login] = useLoginMutation();
  const [state, action] = useFormState(
    async (prevState: unknown, formData: FormData) => {
      const result = await signInAction(prevState, formData);

      // TODO: Think about creating userSlice and store user info from login response to redux store
      // if (result.succssese) {
      //   const credentials = {
      //     email: formData.get('email') as string,
      //     password: formData.get('password') as string,
      //   };

      //   try {
      //     await login(credentials).unwrap();
      //     return result;
      //   } catch (error) {
      //     console.error(error);
      //     return { serverError: 'Failed to save user data' };
      //   }
      // }

      return result;
    },
    {
      errors: {},
      serverError: undefined,
      succssese: undefined,
    },
  );

  useEffect(() => {
    if (state.succssese) {
      startTransition(() => {
        router.push('/profile');
      });
    }
  }, [state.succssese, router]);

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
