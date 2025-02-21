'use client';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import Form from '../Form';
import { useFormState } from 'react-dom';
import { createUserAddress } from '@/app/profile/_actions/addressActions';

function AddressForm({ userId, refresh }: { userId: string; refresh: () => void }) {
  const [state, action] = useFormState(
    async (prevState: unknown, formData: FormData) => {
      const result = await createUserAddress(userId, prevState, formData);
      if (result.succssese) {
        refresh();
      }
      return result;
    },
    {
      errors: {},
      serverError: undefined,
      succssese: undefined,
    },
  );

  return (
    <Form action={action} className="flex flex-col gap-3 w-full md:w-1/2 my-5">
      {(['city', 'street', 'number', 'country', 'postalCode'] as const).map((el, i) => (
        <InputComponent
          key={`${el} + ${i}`}
          label={el.toUpperCase()}
          name={el}
          type={'text'}
          placeholder={`Enter your ${el}`}
          error={state?.errors?.[el]?.[0]}
        />
      ))}

      {state?.serverError && <p className="text-red-500 text-center">{state.serverError}</p>}

      <ButtonComponent type="submit" text="Save address" className="w-full md:max-w-28" />
    </Form>
  );
}

export default AddressForm;
