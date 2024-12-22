import express, { Request, Response } from "express";
import sendResponse from "../../utils/responseHelper";
import * as transactionService from "./transactionService";
import verifyToken from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        sendResponse(res, 200, "Transactions fetched successfully", transactions);
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching transactions", null, error.message);
    }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid transaction ID");
        }
        const transaction = await transactionService.getTransactionById(id);
        if (transaction) {
            sendResponse(res, 200, "Transaction fetched successfully", transaction);
        } else {
            sendResponse(res, 404, "Transaction not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching transaction", null, error.message);
    }
});


router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const { totalAmount, paymentType, userId } = req.body;
        const transaction = await transactionService.createTransaction(totalAmount, paymentType, userId);
        sendResponse(res, 201, "Transaction created successfully", transaction);
    } catch (error: any) {
        sendResponse(res, 500, "Error creating transaction", null, error.message);
    }
});


router.put("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { totalAmount } = req.body;
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid transaction ID");
        }
        const transaction = await transactionService.updateTransaction(id, totalAmount);
        if (transaction) {
            sendResponse(res, 200, "Transaction updated successfully", transaction);
        } else {
            sendResponse(res, 404, "Transaction not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error updating transaction", null, error.message);
    }
});


router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid transaction ID");
        }
        const transaction = await transactionService.deleteTransaction(id);
        if (transaction) {
            sendResponse(res, 200, "Transaction deleted successfully", transaction);
        } else {
            sendResponse(res, 404, "Transaction not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error deleting transaction", null, error.message);
    }
});

export default router;