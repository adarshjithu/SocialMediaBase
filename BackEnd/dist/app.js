"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const adminRoutes_1 = __importDefault(require("./Routes/adminRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const cookieParser = require("cookie-parser");
const errorHandeler_1 = __importDefault(require("./Middleware/errorHandeler"));
const postRoutes_1 = __importDefault(require("./Routes/postRoutes"));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Corrected URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Corrected to an array of methods
    allowedHeaders: ["Content-Type", "Authorization"], // Corrected to an array of headers
    credentials: true, // If you need to send cookies or other credentials
}));
app.use(cookieParser());
app.use((0, express_session_1.default)({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false, // Save session even if it was not modified
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // Session expiration (1 day in milliseconds)
    }
}));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json()); // To parse JSON request bodies
// Route handlers
app.use("/", userRoutes_1.default);
app.use("/admin", adminRoutes_1.default);
app.use("/post", postRoutes_1.default);
// Global error handler
app.use(errorHandeler_1.default);
exports.default = app;
