import { Request } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';

// Configure Multer storage options
const storage: StorageEngine = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, path.join(__dirname, '../uploads')); // Adjust the path as needed
  },
  filename: (req:Request, file: Express.Multer.File, cb:any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize Multer
const upload = multer({ storage });

export default upload;
