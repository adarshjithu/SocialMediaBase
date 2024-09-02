"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRepository_1 = require("../Repositories/post/postRepository");
const postServices_1 = require("../Services/postServices");
const postControler_1 = require("../Controlers/postControler");
const upload_1 = __importDefault(require("../Middleware/upload"));
const postRouter = express_1.default.Router();
const postRepository = new postRepository_1.PostRepository();
const postServices = new postServices_1.PostServices(postRepository);
const controler = new postControler_1.PostControlers(postServices);
postRouter.post('/image/upload', upload_1.default.any(), (req, res, next) => { controler.uploadImage(req, res, next); });
exports.default = postRouter;
