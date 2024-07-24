import {z} from 'zod';

export const userNameValidation = z.string()
        .min(4, {message: 'Name must be at least 4 characters long'})
        .max(20, {message: 'Name must be at most 20 characters long'})
        .regex(/^[a-zA-Z]+$/, {message: 'Name must contain only letters'});

export const signUpSchema = z.object({
    name : userNameValidation,
    email : z.string().email(),
    password : z.string().min(8, {message: 'Password must be at least 8 characters long'}).max(20, {message: 'Password must be at most 20 characters long'}). regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/, {message: 'Password must contain at least one uppercase letter, one lowercase letter and one number'}),
});


