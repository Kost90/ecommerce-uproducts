import { useState } from 'react';

function useErrorsManageHook<T extends object>() {
  const [errors, setErrors] = useState<Partial<T>>({});

  return { errors, setErrors };
}

export default useErrorsManageHook;
