import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  username: z.string().trim().min(3, 'Username must be at least 3 characters'),
  email: z.email('Please enter a valid email'),
});

export type UserFormData = z.infer<typeof userSchema>;
