import { NextFunction, Request, Response } from "express";
import UserService from "../Services/userService";
import { STATUS_CODES } from "../Constants/httpStatusCodes";
import { generateAccessToken, verifyRefreshToken } from "../Utils/token";
import { createAdmin } from "../Utils/admin";
import { PostRepository } from "../Repositories/post/postRepository";
import upload from "../Middleware/upload";
const { OK, BAD_REQUEST, UNAUTHORIZED, CONFLICT } = STATUS_CODES;

export class PostControlers{
    constructor(public postRepository:PostRepository){
        
    }

    async uploadImage (req: Request, res: Response,next:NextFunction)  {
    console.log(req.files)
    }
       
}



            
        

