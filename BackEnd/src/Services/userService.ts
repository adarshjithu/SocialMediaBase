import { Iuser } from "../Inteface/IUser";
import { ResetPasswordInterface } from "../Inteface/userInterfaces";
import { IUser, User } from "../Models/userModel";
import UserRepository from "../Repositories/user/userRepository";
import { generateOtp, sendOtp } from "../Utils/otp";
import { comparePassword, hashPassword } from "../Utils/password";
import { generateAccessToken, generateRefreshToken, validateInput } from "../Utils/token";
import bcrypt, { compare } from "bcrypt";

class UserService {
     constructor(public userRepository: UserRepository) {}

     // Registering user while signup with otp
     async registerUser(userData: IUser): Promise<any> {
          try {
               let otp = generateOtp();

               if (await sendOtp(userData, otp)) {
                    let time = Date.now();
                    let user = {
                         name: userData.name,
                         email: userData.email,
                         password: userData.password,
                         phonenumber: userData.phonenumber,
                         otp: otp,
                         time: time,
                    };
                    return {success:true,user:user};
               } else {
                  return {success:false}
               }
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // Checking email exists or not
     async createUser(userData: IUser): Promise<IUser | null> {
          try {
               return this.userRepository.emailExist(userData.email);
               
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // Verify OTP in signup
     async verifyOtp(otp: number, userData: any): Promise<Record<string, any> | null> {
          try {
               
               const curTime: number = Date.now();
               const otpTime: any = userData?.time;
               let timeInSec = Math.floor((curTime - otpTime) / 1000);

               if (!userData) {
                    return { success: false, message: "User not found signup again.." };
               }
               if (!otp) {
                    return { success: false, message: "Enter a valid otp" };
               }

               if (timeInSec > 30) {
                    return { success: false, message: "OTP expired.." };
               } else {
                    if (otp == userData.otp) {
                         return { success: true, message: "OTP Verification successfull" };
                    } else {
                         return { success: false, message: "Invalid OTP" };
                    }
               }
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // Save all the user after OTP verification in the database
     async saveUser(userData: any): Promise<Record<string,any>|undefined|null> {
          try {
               userData.password = await hashPassword(userData.password);
               const user = await this.userRepository.saveUser(userData);

               if (user) {
                    const userId = String(user?._id);

                    let accessToken = generateAccessToken(userId);
                    let refreshToken = generateRefreshToken(userId);

                    return {
                         success: true,
                         accessToken: accessToken,
                         refreshToken: refreshToken,
                         user: user,
                         message: "Authenication successfull",
                    };
               }
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // For Verifying email
     async verifyEmail(email: string): Promise<IUser | null> {
          try {
               return await this.userRepository.checkEmail(email);
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // For resending otp in the signup processs
     async resendOtp(userData: any, id: string): Promise<Record<string, any> | null> {
          try {
               if (!userData) {
                    return { success: false, message: "User Data does't existe Signup again" };
               } else {
                    const otp = generateOtp();
                    if (await sendOtp(userData, otp)) {
                         const time = Date.now();
                         userData.time = time;
                         userData.otp = otp;
                         return { success: true, userData: userData };
                    } else {
                         return { success: false, message: "Otp Sending failed" };
                    }
               }
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // For login user
     async userLogin(userData: any): Promise<Record<string, any> | null> {
          try {
               const user = await this.userRepository.checkEmail(userData.email);

               if (!user) {
                    return { success: false, message: "User Not Found" };
               } else {
                    if (user.isBlocked) {
                         return { success: false, message: "User blocked by Admin" };
                    }
                    const isPasswordValid = await comparePassword(userData.password, user.password);
                    if (isPasswordValid) {
                         const accessToken = generateAccessToken(String(user?._id));
                         const refreshToken = generateRefreshToken(String(user?._id));

                         return {
                              success: true,
                              accessToken: accessToken,
                              refreshToken: refreshToken,
                              user: {
                                   _id: user._id,
                                   name: user.name,
                                   email: user.email,
                                   phonenumber: user.phonenumber,
                                   isBlocked: user.isBlocked,
                                   createdAt: user.createdAt,
                                   updatedAt: user.updatedAt,
                              },
                              message: "Authenication successfull",
                         };
                    } else {
                         return {
                              success: false,
                              message: "Invalid Password",
                         };
                    }
               }
          } catch (error) {
               console.log(error as Error);
               return null;
          }
     }

     // Find user byid
     async findUserById(id: string): Promise<any> {
          try {
               return await this.userRepository.findById(id);
          } catch (error) {
               console.log(error as Error);
          }
     }
     async verifyUser(arg: any): Promise<any | null> {
          try {
               let emailOrPhone = validateInput(arg.type);
               if (emailOrPhone.email || emailOrPhone.phonenumber) {
                    emailOrPhone.isForForget = true
                    const user = await this.userRepository.findByEmailOrPhone(emailOrPhone);
                    
                    if (user) {
                         const otp = generateOtp();
                         if (await sendOtp(emailOrPhone, otp)) {
                              return { success: true, time: Date.now(), forgetotp: otp, user: user, message: "Otp Send for verification" };
                         }else{
                              return {succes:false,message:"OTP Verification failed"}
                         }
                    } else {
                         return { success: false, message: "No valid user found with this email or password" };
                    }
               } else {
                    return { success: false, message: "Invalid Email or Phonenumber" };
               }
          } catch (error) {
               console.log(error as Error);
          }
     }

     // Reset password
     async resetPassword(userData: ResetPasswordInterface, userId: string): Promise<any> {
          try {
               const user = await this.userRepository.findById(userId);
               if (!user) {
                    return {
                         success: false,
                         message: "User not found",
                    };
               }
               if (userData.oldpassword == userData.newpassword) {
                    return { success: false, message: "Enter a valid password which is not your old password" };
               }
               const isPasswordValid = await comparePassword(userData.oldpassword, user.password);
               if (isPasswordValid) {
                    const newPassword = await hashPassword(userData.newpassword);
                    let result = await this.userRepository.updatePassword(newPassword, userId);
                    if (result) {
                         return { success: true, message: "Password Updated Successfully" };
                    } else {
                         return { success: false, message: "Password Updation Error" };
                    }
               } else { 
                    return {
                         success: false,
                         message: "Old Password Is Ivalid",
                    };
               }
          } catch (error) {
               console.log(error as Error);
          }
     }

     // Forget password
     async forgetPassword(pass: string, userId: string): Promise<any> {
          try {
               const user = await this.findUserById(userId);
               const isSamePass = await comparePassword(pass, user.password);
               if (isSamePass) {
                    return {
                         success: false,
                         message: "This password already used enter another password",
                    };
               }
               const hashPass = await hashPassword(pass);
               const result = this.userRepository.updatePassword(hashPass, userId);
               return {
                    success: true,
                    message: "Password Updated Successfully",
               };
          } catch (error) {
               console.log(error as Error);
          }
     }

     // Google Authentication
     async googleAuthentication(userData: IUser): Promise<any> {
          try {
                   const isEmailExists = await this.userRepository.emailExist(userData.email);
                   if(isEmailExists){
                    const accessToken = generateAccessToken(isEmailExists._id);
                         const refreshToken = generateRefreshToken(isEmailExists._id)
                         return {success:true,message:"Successfully Authenticated",user:isEmailExists,accessToken:accessToken,refreshToken:refreshToken}
                   }else{

                        const password =String( Math.floor(Math.random()*1000000))
                        userData.password =await hashPassword(`${password}`)
                        const res = await this.userRepository.createUser(userData);
                        if(res){
                             const accessToken = generateAccessToken(res._id);
                             const refreshToken = generateRefreshToken(res._id)
                             return {success:true,message:"Successfully Authenticated",user:res,accessToken:accessToken,refreshToken:refreshToken}
                         }else{
                            return {success:false,message:'Authentication failed'}
                         }
                
               }
          } catch (error) {
               console.log(error as Error);
          }
     }
}
export default UserService;
