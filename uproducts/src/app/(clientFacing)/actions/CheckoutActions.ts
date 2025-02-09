import { ICostumerData } from '@/lib/redux/reducers/orders/ordersSlice';
import { IErrors } from '@/components/checkout/checkoutForm/CheckoutForm';
import { addCostumerDetailsSchema } from '../validations/checkoutSchema';

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
