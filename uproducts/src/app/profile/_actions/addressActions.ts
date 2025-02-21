'use server';
import { addressSchema } from '../validations/addressSchema';
import { revalidatePath } from 'next/cache';
import userServices from '@/api/services/userServices/userServices';

export async function createUserAddress(userId: string, prevState: unknown, formData: FormData) {
  const result = addressSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.formErrors.fieldErrors };
  }

  const address = {
    address: {
      city: result.data.city,
      country: result.data.country,
      number: result.data.number,
      street: result.data.street,
      postalCode: result.data.postalCode,
    },
  };

  const res = await userServices.postUserAddress(userId, address);

  if (res.status !== 200) {
    return { serverError: res.message || 'Post user address failed.' };
  }

  revalidatePath('/profile');
  return { succssese: true };
}

export async function updateUserAddress(userId: string, prevState: unknown, formData: FormData) {
  const result = addressSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.formErrors.fieldErrors };
  }

  const address = {
    address: {
      city: result.data.city,
      country: result.data.country,
      number: result.data.number,
      street: result.data.street,
      postalCode: result.data.postalCode,
    },
  };

  const res = await userServices.updateUserAddress(userId, address);

  if (res.status !== 200) {
    return { serverError: res.message || 'Post user address failed.' };
  }

  revalidatePath('/profile');
  return { succssese: true };
}
