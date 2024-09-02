import { timeStamp } from "console";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
     _id?: mongoose.Types.ObjectId;
     name: string;
     username: string;
     email: string;
     phonenumber: number;
     password: string;
     confirmpassword?: string;
     isOtpEmail?:boolean,
     time?:number|string;
     otp?:number|string;
     isBlocked?:boolean,
     createdAt?:Date,
     updatedAt?:Date,
     isAdmin?:false,
     image?:string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
     name: { type: String, required: true },
     username: { type: String },
     email: { type: String },
     phonenumber: Number,
     password: String,
     image:String,
     isBlocked:{type:Boolean,default:false},
     isAdmin:{type:Boolean,default:false}
     
},{timestamps:true});

export const User = mongoose.model('User',userSchema);
