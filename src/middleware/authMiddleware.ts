import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/responseHelper";
import "dotenv/config";


interface UserData {
    userId: number;
    email: string;
}

interface ValidationRequest extends Request {
    user: UserData;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const validationReq = req as ValidationRequest;
    const { autorization } = validationReq.headers;

    if (!autorization) {
        return sendResponse(res, 401, "Unauthorized");
    }

    if (Array.isArray(autorization)) {
        return sendResponse(res, 401, "Unauthorized");
    }

    const token = autorization.split(" ")[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const decoded = jwt.verify(token, secret) as UserData;
        if (typeof decoded !== 'string') {
            validationReq.user = decoded as UserData;
        }
    } catch (error) {
        return sendResponse(res, 401, "Unauthorized");
    }

    next();
}

export default verifyToken;