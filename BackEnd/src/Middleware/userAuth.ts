import { NextFunction, Request, Response } from "express";
import { verifyRefreshToken, verifyToken } from "../Utils/token";
import { decode } from "punycode";
import UserRepository from "../Repositories/user/userRepository";
import UserService from "../Services/userService";
import { User } from "../Models/userModel";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
     // res.status(401).json({message:"Access Token Expired"})
     try {
          const { access_token, refresh_token } = req.cookies;

          if (!refresh_token) res.status(401).json({ message: "Refresh Token Expired" });
          const refreshTokenValid = verifyRefreshToken(refresh_token);
          if (!refreshTokenValid.data) {
               res.status(401).json({ success: false, message: "Refresh Token Expired" });
          }
          if (!access_token) {
               res.status(401).json({ message: "Access Token Expired" });
          } else {
               const decoded = verifyToken(access_token);

               if (!decoded.data) {
                    res.status(401).json({ success: false, message: "Access Token Expired" });
               } else {
                    const user = await User.findById(decoded.data);
                    req.userId = user?._id;
                    req.user = user;
                    next();
               }
          }
     } catch (error) {}
};
