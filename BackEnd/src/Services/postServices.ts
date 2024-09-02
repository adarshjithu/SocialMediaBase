import { PostRepository } from "../Repositories/post/postRepository";

export class PostServices{
    constructor(public postRepository:PostRepository){

    }
}