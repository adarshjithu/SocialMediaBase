import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import cors from "cors";
import userRouter from "./Routes/userRoutes";
import adminRouter from "./Routes/adminRoutes";
import bodyParser from "body-parser";

import session from "express-session";
const app: Application = express();
import cookieParser = require("cookie-parser");
import errorHandler from "./Middleware/errorHandeler";
import postRouter from "./Routes/postRoutes";


app.use(
     cors({
          origin: "http://localhost:5173", // Corrected URL
          methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Corrected to an array of methods
          allowedHeaders: ["Content-Type", "Authorization"], // Corrected to an array of headers
          credentials: true, // If you need to send cookies or other credentials
     })
);
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Save session even if it was not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // Session expiration (1 day in milliseconds)
    }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To parse JSON request bodies

// Route handlers
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/post", postRouter);

// Global error handler
app.use(errorHandler);

export default app;
