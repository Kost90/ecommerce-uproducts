import { z } from 'zod';

export const addressSchema = z.object({
  city: z.string().min(3, 'City must be at least 3 characters'),
  street: z.string().min(3, 'Street must be at least 3 characters'),
  number: z.string().min(1, 'Number must be at least 1 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  postalCode: z.string().min(3, 'PostalCode must be at least 3 characters'),
});
