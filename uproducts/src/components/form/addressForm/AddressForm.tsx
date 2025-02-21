'use client';
import ButtonComponent from '@/components/button/Button';
import { InputComponent } from '../ui/InputComponent';
import Form from '../Form';
import { useFormState } from 'react-dom';
import { createUserAddress, updateUserAddress } from '@/app/profile/_actions/addressActions';
import { IUserResponse } from '@/types/userTypes';
import { Button } from '@/components/ui/button';

function AddressForm({
  userId,
  refresh,
  address = null,
  isEdit,
  onChange,
}: {
  userId: string;
  refresh: () => void;
  address?: IUserResponse['address'] | null;
  isEdit?: boolean;
  onChange?: () => void;
}) {
  const [state, action] = useFormState(
    async (prevState: unknown, formData: FormData) => {
      if (address && onChange) {
        const result = await updateUserAddress(userId, prevState, formData);

        if (result.succssese) {
          refresh();
        }

        onChange();
        return result;
      } else {
        const result = await createUserAddress(userId, prevState, formData);
        if (result.succssese) {
          refresh();
        }
        return result;
      }
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
          defaultValue={address ? address[el] : ''}
          placeholder={`Enter your ${el}`}
          error={state?.errors?.[el]?.[0]}
        />
      ))}

      {state?.serverError && <p className="text-red-500 text-center">{state.serverError}</p>}

      <div className="flex flex-col md:flex-row gap-5">
        <ButtonComponent type="submit" text={!isEdit ? 'Save address' : 'Edite address'} className="w-full md:max-w-28" />
        {isEdit ? (
          <Button onClick={onChange} className="w-full md:max-w-28">
            Cancel
          </Button>
        ) : null}
      </div>
    </Form>
  );
}

export default AddressForm;
