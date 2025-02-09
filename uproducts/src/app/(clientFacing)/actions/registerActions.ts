'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import authorizationService from '@/api/services/authorization/AuthorizationService';
import signUpSchema from '../validations/signUpSchema';

export async function signUpUser(prevState: unknown, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return { errors: result.error.formErrors.fieldErrors };
  }

  const body = {
    firstname: result.data.firstname,
    lastname: result.data.lastname,
    email: result.data.email,
    password: result.data.password,
    telephone: result.data.telephone,
  };

  const res = await authorizationService.signUp(body);

  if (res.status !== 200) {
    return { serverError: res.message || 'Registration failed. Try different email.' };
  }

  revalidatePath('/');
  redirect('/login');
}
