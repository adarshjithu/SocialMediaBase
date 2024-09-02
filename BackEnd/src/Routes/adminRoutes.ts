import express,{Request,response, Router} from 'express'
import { AdminRepository } from '../Repositories/admin/adminRepository';
import { AdminServices } from '../Services/adminServices';
import { AdminControler } from '../Controlers/adminControler';
import { adminAuth } from '../Middleware/adminAuth';
const adminRouter:Router =  express.Router();

const adminRepository =  new AdminRepository();
const adminService =  new AdminServices(adminRepository);
const controler = new AdminControler(adminService);

adminRouter.get("/users",adminAuth,(req,res,next)=> controler.getAllUsers(req,res,next));
adminRouter.get("/user/block",(req,res,next)=> controler.blockUser(req,res,next));
adminRouter.delete("/user/delete",(req,res,next)=> controler.deleteUser(req,res,next));
adminRouter.post("/login",(req,res,next)=> controler.login(req,res,next));
adminRouter.get("/logout",(req,res,next)=>controler.logout(req,res,next))


export default adminRouter;