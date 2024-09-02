import { NextFunction, Request, Response } from "express";
import { AdminServices } from "../Services/adminServices";
import { STATUS_CODES } from "../Constants/httpStatusCodes";
import { createAdmin } from "../Utils/admin";

const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;
export class AdminControler {
     constructor(public adminServices: AdminServices) {}

     // @desc   Getting all the user data
     // @route  Get /admin/users
     // @access Admin
     async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {

          try {
               const allUsers = await this.adminServices.getAllUsers(req.query.page,req.query.type);
               res.status(OK).json({ users: allUsers });
          } catch (error) {
               next(error);
          }
     }

     // @desc   To block a user
     // @route  Get admin/user/block
     // @access Admin
     async blockUser(req: Request | any, res: Response | any, next: NextFunction | any): Promise<void> {
          try {
               const result = await this.adminServices.blockUser(req?.query.userId);
               res.status(OK).json(result);
          } catch (error) {
               next(error);
          }
     }
     // @desc   To delete a user
     // @route  Get admin/user/delete
     // @access Admin
     async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
             
               const result = await this.adminServices.deleteUser(req?.query.userId);
               res.status(OK).json({ success: true, message: "User Deleted Successfully!" });
          } catch (error) {
               next(error);
          } 
     }
     // @desc   Admin SignIn
     // @route  Get admin/login
     // @access Admin

     async login(req: Request, res: Response, next: NextFunction): Promise<void> {
          try {
               const result = await this.adminServices.login(req.body);
               const accessTokenMaxAge = 48 * 60 * 60 * 1000;
               if (result?.success) {
                    res.cookie("admin_access_token", result.adminAccessToken, { maxAge: accessTokenMaxAge });
                    res.status(OK).json(result);
               } else {
                    res.status(UNAUTHORIZED).json(result);
               }
          } catch (error) {
               next();
          }
     }

     // @desc   Admin logout
     // @route  Get admin/logout
     // @access Admin
     async logout(req: Request, res: Response, next: NextFunction):Promise<void> {
          try {
               res.cookie("admin_access_token", "", { maxAge: 0 });
               res.status(OK).json({ success: true, message: "Admin logout successfull" });
          } catch (error) {
               next(error);
          }
     }
}
