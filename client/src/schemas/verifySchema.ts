import {z} from 'zod';

export const verifySchema = z.object({
    verificationCode : z.string()
    .min(6, {message: 'Verification code must be at least 6 characters long'})
    .max(6, {message: 'Verification code must be at most 6 characters long'})
    .regex(/^[0-9]+$/, {message: 'Verification code must contain only numbers'}),
});