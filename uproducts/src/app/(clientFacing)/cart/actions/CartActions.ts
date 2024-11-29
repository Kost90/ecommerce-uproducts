'use server';
import { z } from 'zod';

const phoneRegex = /^\+44(\d{2}|\d{3})\d{7}$/;

const addCostumerDetailsSchema = z.object({
  firstname: z.string().min(1, 'Firstname is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  deliveryAdress: z.string().min(1, 'Delivery address is required'),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  email: z.string().email('This is not valid email'),
});

export const addCostumerDetails = async (formData: FormData) => {
  const rowsFormData = addCostumerDetailsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!rowsFormData.success) {
    return {
      success: false,
      errors: rowsFormData.error.formErrors.fieldErrors,
    };
  }

  const data = rowsFormData.data;

  if (!data) {
    return { success: false, errors: { global: ['Unexpected error: Parsed data is undefined.'] } };
  }

  return { success: true, data };
};
