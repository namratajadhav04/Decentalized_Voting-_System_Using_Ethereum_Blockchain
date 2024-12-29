// src/middleware/requestLogger.ts
import { Request, Response, NextFunction } from 'express';

let totalRequests = 0;
let failedRequests = 0;

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    totalRequests++;
    res.on('finish', () => {
        // Check if the response status indicates an error
        if (res.statusCode >= 400) {
            failedRequests++;
        }
    });
    next();
};

export const getErrorRate = (): number => {
    if (totalRequests === 0) return 0; // Prevent division by zero
    return (failedRequests / totalRequests) * 100; // Calculate percentage
};
