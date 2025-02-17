import { NextFunction, Request, Response } from "express";
import { Result, ValidationError } from "express-validator";

const ValidatorResponse = (res: Response, errors: Result<ValidationError>) => {
    return res.status(400).json({
        success: false,
        errors: errors.array().map((items: { msg: any; }) => (
            items.msg
        )),
    });
}

export { ValidatorResponse }