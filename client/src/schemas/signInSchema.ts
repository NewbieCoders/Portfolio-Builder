import {z} from 'zod';

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8, {message: 'Password must be at least 8 characters long'})
    .max(20, {message: 'Password must be at most 20 characters long'})
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'}),
})
