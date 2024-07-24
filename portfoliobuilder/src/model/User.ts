import mongoose,{Schema,Document,Model} from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verificationCode: string;
    verificationCodeExpires: Date;
    porfolioDetails: Schema.Types.ObjectId[];
}

const UserSchema:Schema<User> = new mongoose.Schema({
    name : {
        type: String,
        required: [true , 'Please enter a name']
    },
    email : {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        match : [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password : {
        type: String,
        required: [true, 'Please enter a password'],
    },
    isVerified : {
        type: Boolean,
        default: false
    },
    verificationCode : {
        type: String
    },
    verificationCodeExpires : {
        type: Date
    },
    porfolioDetails : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio' }],
    },
    {
        timestamps: true
    });


    const User = (mongoose.models.users as mongoose.Model<User>)  || mongoose.model<User>('users', UserSchema);

    export default User;