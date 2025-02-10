'use client';
import authorizationService from '@/api/services/authorizationServices/AuthorizationService';
import loginSchema from '../validations/loginSchema';

export async function signInAction(prevState: unknown, formData: FormData) {
  const result = await loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.formErrors.fieldErrors };
  }

  const body = {
    email: result.data.email,
    password: result.data.password,
  };

  const res = await authorizationService.signIn(body);

  if (res.status !== 200) {
    return { serverError: res.error?.message || 'Login failed. Please try again.' };
  }

  return { succssese: true };
}
