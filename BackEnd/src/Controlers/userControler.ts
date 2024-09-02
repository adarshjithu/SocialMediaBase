import { NextFunction, Request, Response } from "express";
import UserService from "../Services/userService";
import { STATUS_CODES } from "../Constants/httpStatusCodes";
import { generateAccessToken, verifyRefreshToken } from "../Utils/token";
import { createAdmin } from "../Utils/admin";
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;

class UserControler {
     constructor(public userServices: UserService) {}

     // @desc   User registation
     // @route  POST /register
     // @access Public
     async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               const newUser = await this.userServices.createUser(req.body);
               if (!newUser) {
                    
                    let user = await this.userServices.registerUser(req.body);
                    if(user.success==true){

                         req.session.userData = user.user;
                         res.status(OK).json({ success: true, message: "OTP Send for verification..", time: user?.user?.time, otpPlace: user?.user?.email });
                    }else{
                         res.status(BAD_REQUEST).json({success:false,message:'OTP authentication failed'})
                    }

               } else {
                    res.status(BAD_REQUEST).json({ success: false, message: "The email already in use.." });
               }
               
          } catch (error) {
               next(error);
          }
     }

     // @desc   OTP Verification
     // @route  POST /verify-otp
     // @access Public
     async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               //taking req.body.otp and session otp
               //validate otp verifying otp valid or not
               const otp = req.body.otp;
               const userData = req.session.userData;
               const isOtpValid = await this.userServices.verifyOtp(otp, userData);
               const accessTokenMaxAge = 5 * 60 * 1000;
               const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
               if (isOtpValid?.success) {
                    //Is otp valid create new User and JWT
                    const newUser = await this.userServices.saveUser(userData);

                    if (newUser?.success) {
                         console.log(newUser.success);
                         res.cookie("access_token", newUser.accessToken, { maxAge: accessTokenMaxAge });
                         res.cookie("refresh_token", newUser.refreshToken, { maxAge: refreshTokenMaxAge });
                         res.status(OK).json(newUser);
                    } else {
                         res.status(UNAUTHORIZED).json(isOtpValid);
                    }
               } else {
                    res.status(UNAUTHORIZED).json(isOtpValid);
               }
          } catch (error) {
               next(error);
          }
     }

     // @desc   For checking email already exist or not
     // @route  POST /verify-email
     // @access Public
     async verifyEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               let isEmailExists = await this.userServices.verifyEmail(req.body.email);

               if (isEmailExists) {
                    res.status(CONFLICT).json({ success: false, message: "Email already exists" });
               } else {
                    res.status(OK).json({ success: true});
               }
          } catch (error) {
               next(error);
          }
     }

     // @desc   For resending otp
     // @route  POST /resend-otp
     // @access Public
     async resendOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               let result = await this.userServices.resendOtp(req.session.userData, req.params.id);
               if (result?.success) {
                    req.session.userData = result.userData;
                    res.status(OK).json({
                         success: true,
                         message: "OTP Send for verification..",
                         time: req.session.userData?.time,
                         otpPlace: req.session.userData?.email,
                    });
               } else {
                    res.status(BAD_REQUEST).json(result);
               }
          } catch (error) {
               next(error);
          }
     }

     // @desc   Logout user
     // @route  Get /logout
     // @access Public
     async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               res.cookie("access_token", "", { maxAge: 0 });
               res.cookie("refresh_token", "", { maxAge: 0 });
               res.status(OK).json({ success: true, message: "User logout successfull" });
          } catch (error) {
               next(error);
          }
     }

     // @desc   Login user
     // @route  Post /login
     // @access Public
     async login(req: Request, res: Response, next: NextFunction) {

          try {
               const accessTokenMaxAge = 5 * 60 * 1000;
               const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
               const result = await this.userServices.userLogin(req.body);
               if (result?.success) {
                    res.status(OK)
                         .cookie("access_token", result?.accessToken, { maxAge: accessTokenMaxAge })
                         .cookie("refresh_token", result?.refreshToken, { maxAge: refreshTokenMaxAge })
                         .json({ success: true, user: result?.user, message: result?.message });
               } else {
                    res.status(UNAUTHORIZED).json(result);
               }
          } catch (error) {
               next(error);
          }  
     }

     // @desc   For refreshing accesstoken
     // @route  POST /refresh-token
     // @access Public
     async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
          const { refresh_token } = req.cookies;

          if (!refresh_token) res.status(401).json({ success: false, message: "No Refresh Token Found" });

          try {
               const decoded: any = verifyRefreshToken(refresh_token);

               const user = await this.userServices.findUserById(decoded.data);

               if (user) {
                    const newAccessToken = generateAccessToken(user._id);

                    res.json({ access_token: newAccessToken });
               } else {
                    res.status(401).json({ success: false, message: "Invalid refresh token" });
               }
          } catch (error) {
               res.status(401).json({ success: false, message: "Invalid refresh token" });
          }
     }

     // @desc   For forgeting password
     // @route  POST /forget-password
     // @access Public
     async forgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               if (!req.session.forgetData) res.status(BAD_REQUEST).json({ success: false, message: "No User Found" });
               const result: Record<string, any> = await this.userServices.forgetPassword(req.body.password, req.session.forgetData?.user._id);
               console.log(result);
               if (result.success) {
                    res.status(OK).json(result);
               } else {
                    res.status(BAD_REQUEST).json(result);
               }
          } catch (error) {
               next(error);
          }
     }

     // @desc   For Verify email or phonenumber
     // @route  POST /verify-user
     // @access Public
     async verifyUser(req: Request, res: Response, next: NextFunction) {
          try {
               const result = await this.userServices.verifyUser(req.body);
               if (result.success) {
                    req.session.forgetData = result;
                    console.log(req.session.forgetData);
                    res.status(OK).json({ success: true, time: result.time, userId: result.user._id, message: "Otp send for verification" });
               } else {
                    res.status(BAD_REQUEST).json(result);
               }
          } catch (error) {
               next(error);
          }
     }

     // @desc   For For reseting password of user
     // @route  POST /reset-password
     // @access Private
     async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               const result = await this.userServices.resetPassword(req.body, req?.userId);
               console.log(result,'result')

               // if (result.success) {
               //      res.status(OK).json(result);
               // } else {
               //      res.status(400).json(result);
               // }
          } catch (error) {
               next(error);
          }
     }

     // @desc   For For reseting password of user
     // @route  POST /reset-password
     // @access Private
     async submitOtpForgetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               const time: any = req.session.forgetData?.time;

               const otp = req.body?.otp;
               const timeInSec = Math.floor((Date.now() - time) / 1000);
               if (timeInSec > 30) {
                    res.status(BAD_REQUEST).json({ success: false, message: "Otp Expired" });
               }
               if (otp == req?.session?.forgetData?.forgetotp) {
                    res.status(OK).json({ success: true, message: "OTP Verified Successfully" });
               } else {
                    res.status(BAD_REQUEST).json({ success: false, message: "Invalid Otp" });
               }
          } catch (error) {
               next(error);
          }
     }
     // @desc   Google authentication
     // @route  POST /googe/auth
     // @access Public
     async googleAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               const accessTokenMaxAge = 5 * 60 * 1000;
               const refreshTokenMaxAge = 48 * 60 * 60 * 1000;
               const result = await this.userServices.googleAuthentication(req.body);
          
               if (result.success) {
                    res.status(OK)
                         .cookie("access_token", result.accessToken, { maxAge: accessTokenMaxAge })
                         .cookie("refresh_token", result.refreshToken, { maxAge: refreshTokenMaxAge })
                         .json(result);
               } 
          } catch (error) {
               next(error);
          }
     }
}
export default UserControler;
