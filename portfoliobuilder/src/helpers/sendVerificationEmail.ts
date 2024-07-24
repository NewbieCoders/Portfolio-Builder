import {resend} from '../lib/resend';
import VerifyEmail from '../../emails/VerifyEmail';
import { ApiResponse } from '@/types/ApiResponse';

export async function sendVerificationEmail(email: string, verificationCode: string): Promise<ApiResponse> {
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Portfolio Builder | Verification Code',
            react: VerifyEmail({verificationCode}),
          });

        return{
            success: true,
            message: "Verification email sent"
        }

    }catch(error){
        console.log("Error sending verification email: ", error);
        return{
            success: false,
            message: "Error sending verification email"
        }
    }
}