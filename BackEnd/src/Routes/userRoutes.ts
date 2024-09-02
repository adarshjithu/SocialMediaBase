import express, { Request, response, Router } from "express";
import UserRepository from "../Repositories/user/userRepository";
import UserService from "../Services/userService";
import UserControler from "../Controlers/userControler";
import { authenticate } from "../Middleware/userAuth";

const userRouter: Router = express.Router();

// userRouter.get("/register", (req, res) => {});

const userRepository = new UserRepository();
const userServices = new UserService(userRepository);
const controler = new UserControler(userServices);

userRouter.post("/register", (req, res, next) => {  controler.registerUser(req, res, next);});
userRouter.post("/otp/submit", (req, res, next) => {controler.verifyOtp(req, res, next);});
userRouter.post('/verify-email',(req,res,next) => controler.verifyEmail(req,res,next))
userRouter.get('/otp/resend/:id',(req,res,next) => {controler.resendOtp(req,res,next)})
userRouter.get("/logout",(req,res,next) => controler.logout(req,res,next));
userRouter.post("/login",(req,res,next) => controler.login(req,res,next));
userRouter.post("/refresh-token",(req,res,next) => controler.refreshToken(req,res,next));
userRouter.post("/password/forget",(req,res,next) => controler.forgetPassword(req,res,next));
userRouter.post("/verify-user",(req,res,next) => controler.verifyUser(req,res,next));
userRouter.post("/password/reset",authenticate,(req,res,next) => controler.resetPassword(req,res,next));
userRouter.post("/otp/submit/forgetpassword",(req,res,next)=>controler.submitOtpForgetPassword(req,res,next))
userRouter.post("/google/auth",(req,res,next)=>{controler.googleAuth(req,res,next)});



export default userRouter;
