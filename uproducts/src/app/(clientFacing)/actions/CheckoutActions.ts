import { z } from 'zod';
import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
import { IErrors } from '@/components/checkout/checkoutForm/CheckoutForm';

const phoneRegex = /^\+44(\d{2}|\d{3})\d{7}$/;

export const addressSchema = z.object({
  street_number: z.string().optional(),
  route: z.string().min(1, 'Street address is required'),
  postal_town: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
});

const addCostumerDetailsSchema = z.object({
  firstname: z.string().min(1, 'Firstname is required'),
  lastname: z.string().min(1, 'Lastname is required'),
  deliveryAdress: addressSchema,
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  email: z.string().email('This is not valid email'),
});

export const addCostumerDetails = async (formData: ICostumerData) => {
  const rowsFormData = addCostumerDetailsSchema.safeParse(formData);
  if (!rowsFormData.success) {
    return {
      success: false,
      errors: rowsFormData.error.formErrors.fieldErrors as unknown as IErrors,
    };
  }

  const data = rowsFormData.data;

  return { success: true, data };
};
