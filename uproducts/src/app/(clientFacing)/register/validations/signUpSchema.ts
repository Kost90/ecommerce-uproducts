import { z } from 'zod';

const signUpSchema = z.object({
  firstname: z.string().min(2, 'First name must be at least 2 characters long'),
  lastname: z.string().min(2, 'Last name must be at least 2 characters long'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@, $, !, %, *, ?, &)'),
  telephone: z.string().regex(/^\+?(44\d{9}|380\d{9})$/, 'Phone number must be a valid UK (+44) or Ukrainian (+380) mobile number'),
});

export default signUpSchema;
