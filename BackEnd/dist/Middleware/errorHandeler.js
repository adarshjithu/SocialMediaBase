"use strict";
// src/middleware/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500);
    res.json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
}
exports.default = errorHandler;
// import { Request, Response, NextFunction } from 'express';
// import fs from 'fs';
// import path from 'path';
// const logFilePath = path.join(__dirname, '../error.log');
// export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
//   const errorLog = `${new Date().toISOString()} - Error: ${err.message}\nStack: ${err.stack}\n\n`;
//   fs.appendFile(logFilePath, errorLog, (error) => {
//     if (error) console.error('Failed to write to log file:', error);
//   });
//   res.status(err.status || 500).json({ success: false, message: 'An error occurred' });
// }
