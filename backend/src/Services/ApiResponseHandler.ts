import { NextFunction, Request, Response } from "express";

const ApiResponse = (res: Response, success: boolean, status: number, message: string, data: any | null = null) => {
    return res.status(status).json({
        success: success,
        message: message,
        data: data
    });
}

export { ApiResponse }