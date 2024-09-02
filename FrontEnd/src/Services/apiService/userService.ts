import { SignupInterface } from "../../Pages/User/Signup/Signup";
import axiosInstance from "../api";
import errorHandler from "../erroHandler";
import { ResetPasswordInterface } from "../../Pages/User/ResetPassword/ResetPassword";

//User registration
export const registerUser = async (userDetails: SignupInterface) => {
     try {
          const response = await axiosInstance.post("/register", userDetails);
          console.log(response,'res')
          return response;
     } catch (error) {
          errorHandler(error)
     }
};

//Otp Verfication
export const submitOtp = async (otp: string) => {
     try {
          const response = await axiosInstance.post("/otp/submit", { otp: otp });
          return response.data;
     } catch (error) {
         errorHandler(error)
     }
};

//Checking Email already exists or not;
export const verifyEmail = async (email: string) => {
     try {
          const response = await axiosInstance.post("/verify-email", { email: email });
          console.log("re", response);
          return response.data;
     } catch (error) {
         errorHandler(error)
     }
};

//Resend OTP
export const resendOTP = async (arg: string | null) => {
     try {
          const response = await axiosInstance.get(`/otp/resend/id:${arg}`);
          return response.data;
     } catch (error) {
          errorHandler(error)
     }
};

//Logout
export const logoutUser = async () => {
     try {
          const response = await axiosInstance.get("/logout");
          return response.data;
     } catch (error) {
        errorHandler(error)
     }
};

//Login
export const loginUser = async (arg: Object) => {
     try {
          const response = await axiosInstance.post(`/login`, arg);
          console.log(response,'resonse')
          return response.data
         
          // return response.data;
     } catch (error) {
          errorHandler(error)
     }
};

//ForgetPassword
export const forgetPassword = async (FormData:any) => {
     try {
          const response = await axiosInstance.post(`/password/forget`,FormData);
        
          return response.data
         
        
     } catch (error) {
          errorHandler(error)
     }
};
//VerifyUser
export const verifyUser = async (arg:string) => {
     try {
          const response = await axiosInstance.post(`/verify-user`,{type:arg});
        
          return response.data
         
        
     } catch (error) {
          errorHandler(error)
     }
};

//ResetPassword
export const resetPassword = async (arg: ResetPasswordInterface) => {
     try {
          const response = await axiosInstance.post(`/password/reset`,arg);
        
          return response.data
         
        
     } catch (error) {
          errorHandler(error)
     }
};
//submitOtpForForgetPassword
export const submitOtpForForgetPassword = async (arg:string) => {
     try {
          
          const response = await axiosInstance.post(`/otp/submit/forgetpassword`,{otp:arg});
        
          return response.data
         
        
     } catch (error) {
          errorHandler(error)
     }
};

