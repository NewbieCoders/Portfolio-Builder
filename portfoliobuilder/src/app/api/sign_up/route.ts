import dbConnect from "@/lib/dbConnect";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { resend } from '../../../lib/resend';
import otpGenerator from 'otp-generator';

async function POST(request:Request){

    await dbConnect();

    try{
        const {username, email, password} = await request.json();

        if(!username || !email || !password){
            return Response.json(
                {success: false, message: "Please fill all fields"},
                {status: 400}
            )
        }

        const existingUser = await User.findOne({email});
       
        const verificationCode = otpGenerator.generate(6, {upperCaseAlphabets: false,lowerCaseAlphabets: false, specialChars: false });
        
        if(existingUser){ 
            if(existingUser.isVerified){
                return Response.json(
                    {success: false, message: "User already exists"},
                    {status: 400}
                )    
             }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUser.name = username;
                existingUser.password = hashedPassword;
                existingUser.verificationCode = verificationCode ;
                existingUser.verificationCodeExpires = new Date(Date.now() + 3600000);

                 await existingUser.save();
            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name: username,
                email,
                password: hashedPassword,
                isVerified: false,
                verificationCode,
                verificationCodeExpires: new Date(Date.now() + 3600000)
            });

            await newUser.save();
        
        }

        const emailResponse = await sendVerificationEmail(email, verificationCode);

        if(!emailResponse.success){
            return Response.json(
                {success: false, message: emailResponse.message},
                {status: 500}
            )
        }

        return Response.json({
            success: true,
            message: "User registered successfully",
        },{
            status: 200
        });
            
    }catch(err){
        console.log("Error in registering user: ", err);
        return Response.json(
            {success: false, message: "Error in registering user"},
            {status: 500}
        )
    }
}

