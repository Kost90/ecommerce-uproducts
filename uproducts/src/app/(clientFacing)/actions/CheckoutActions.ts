import { z } from 'zod';
import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
import { IErrors } from '@/components/checkout/checkoutForm/CheckoutForm';

const phoneRegex = /^\+44(\d{2}|\d{3})\d{7}$/;

export const addressSchema = z.object({
  street_number: z.string().min(1, 'Number of house or name is required'),
  route: z.string().min(1, 'Street address is required'),
  postal_town: z.string().min(3, 'Town or city is required'),
  country: z.string().min(1, 'Country is required'),
  postal_code: z.string().min(1, 'Postal code is required'),
});

const addCostumerDetailsSchema = z.object({
  firstname: z.string().min(3, 'Firstname is required and must be at least 3 character'),
  lastname: z.string().min(3, 'Lastname is required and must be at least 3 character'),
  deliveryAdress: addressSchema,
  phone: z.string().regex(phoneRegex, 'Invalid phone number must start from +44'),
  email: z.string().email('This is not valid email'),
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
