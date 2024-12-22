import { Response } from "express";

type ResponseData = {
    message: string;
    statusCode: number;
    data?: any;
    error?: any;
};

const sendResponse = (
    res: Response,
    statusCode: number,
    message: string,
    data: any = null,
    error: any = null
): void => {
    const response: ResponseData = { message, statusCode, data, error };

    const filteredResponse = Object.fromEntries(
        Object.entries(response).filter(([_, value]) => value !== null)
    );

    res.status(statusCode).send(filteredResponse);
};

export default sendResponse;
