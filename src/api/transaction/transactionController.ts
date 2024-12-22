import express, { Request, Response } from "express";
import sendResponse from "../../utils/responseHelper";
import * as transactionService from "./transactionService";
import verifyToken from "../../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction management APIs
 */

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Transactions fetched successfully
 *               data: []
 *       500:
 *         description: Internal server error
 */
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const transactions = await transactionService.getAllTransactions();
        sendResponse(res, 200, "Transactions fetched successfully", transactions);
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching transactions", null, error.message);
    }
});

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Transaction fetched successfully
 *               data:
 *                 id: 1
 *                 totalAmount: 100.0
 *                 paymentType: "Credit Card"
 *                 userId: 1
 *                 createdAt: "2024-12-22T12:00:00Z"
 *       404:
 *         description: Transaction not found
 */
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

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalAmount:
 *                 type: number
 *               paymentType:
 *                 type: string
 *               userId:
 *                 type: integer
 *             required:
 *               - totalAmount
 *               - paymentType
 *               - userId
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 201
 *               message: Transaction created successfully
 *               data:
 *                 id: 1
 *                 totalAmount: 100.0
 *                 paymentType: "Credit Card"
 *                 userId: 1
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const { totalAmount, paymentType, userId } = req.body;
        const transaction = await transactionService.createTransaction(totalAmount, paymentType, userId);
        sendResponse(res, 201, "Transaction created successfully", transaction);
    } catch (error: any) {
        sendResponse(res, 500, "Error creating transaction", null, error.message);
    }
});

export default router;
