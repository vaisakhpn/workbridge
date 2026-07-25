import { z } from 'zod';

export const registerWorkerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number'),
});

export const registerEventTeamSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters long'),
  ownerName: z.string().min(2, 'Owner name must be at least 2 characters long'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Contact phone must be a valid 10-digit number'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
