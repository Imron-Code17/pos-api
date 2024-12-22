import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/responseHelper";
import "dotenv/config";

interface UserData {
    userId: number;
    email: string;
}

interface ValidationRequest extends Request {
    user?: UserData;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const validationReq = req as ValidationRequest;
    const { authorization } = validationReq.headers;

    if (!authorization) {
        return sendResponse(res, 401, "Unauthorized: Token is missing");
    }

    if (!authorization.startsWith("Bearer ")) {
        return sendResponse(res, 401, "Unauthorized: Token format is invalid");
    }

    const token = authorization.split(" ")[1];
    const secret = process.env.JWT_SECRET || "";

    try {
        const decoded = jwt.verify(token, secret) as UserData;
        if (decoded && typeof decoded !== "string") {
            validationReq.user = decoded;
        } else {
            return sendResponse(res, 401, "Unauthorized: Token is invalid");
        }
    } catch (error: any) {
        console.error("Token Verification Error:", error.message);
        if (error.name === "TokenExpiredError") {
            return sendResponse(res, 401, "Unauthorized: Token has expired");
        }
        return sendResponse(res, 401, "Unauthorized: Token is invalid");
    }

    next();
};

export default verifyToken;
