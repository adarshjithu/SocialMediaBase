import express  from 'express';
import dotenv from 'dotenv'
import app from './app'
import connectDB from './Config/db';

dotenv.config()

connectDB()


app.listen(3000,()=>{
    console.log('server started') 
}) 