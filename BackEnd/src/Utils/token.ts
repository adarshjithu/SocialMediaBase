import jwt,{JwtPayload} from "jsonwebtoken";
import { ObjectId } from "mongoose";

 export const generateAccessToken = (payload:any) => {
     const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: "5m" });
     return token;
};
export const generateRefreshToken = (payload: any) => {
     const token = jwt.sign({ data: payload }, `${process.env.JWT_SECRET}`, { expiresIn: "48h" });
     return token;
};

export const verifyToken = (token: string):any => {
     try {
          const secret = `${process.env.JWT_SECRET}`;
          const decoded = jwt.verify(token, secret);
          return decoded;
     } catch (error: any) {
          console.log("Error while jwt token verification");
          if (error.name == "TokenExpiredError") return { success: false, message: "Token Expired" };
          else return { success: false, message: "Internal server error" };
     }
};

export const verifyRefreshToken = (token: string):any => {
     try {
          const secret = `${process.env.JWT_SECRET}`;
          const decoded = jwt.verify(token, secret);
          return decoded;
     } catch (error) {
          return error;
          console.log(error as Error);
     }
};






export function validateInput(input:any):any {
     // Regular expression for a valid email address
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     
     // Regular expression for a valid 10-digit phone number
     const phoneRegex = /^\d{10}$/;
   
     if (emailRegex.test(input)) {
       return {email:input};
     } else if (phoneRegex.test(input)) {
       return {phonenumber:input};
     } else {
       return "Invalid input: not a valid email or 10-digit phone number";
     }
   }