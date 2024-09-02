import express from 'express'
import { PostRepository } from '../Repositories/post/postRepository'
import { PostServices } from '../Services/postServices';
import { PostControlers } from '../Controlers/postControler';
import upload from '../Middleware/upload';
const postRouter =express.Router()  

const postRepository = new PostRepository();
const postServices =  new PostServices(postRepository);
const controler  = new PostControlers(postServices);

postRouter.post('/image/upload',upload.any(),(req,res,next)=>{controler.uploadImage(req,res,next)})
export default postRouter;