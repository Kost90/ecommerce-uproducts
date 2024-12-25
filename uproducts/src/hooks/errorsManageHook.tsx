import { Dispatch, SetStateAction, useState } from 'react';

function useErrorsManageHook<T extends object>(): {
  errors: Partial<T>;
  setErrors: Dispatch<SetStateAction<Partial<T>>>;
} {
  const [errors, setErrors] = useState<Partial<T>>({});

  return { errors, setErrors };
}

export default useErrorsManageHook;
