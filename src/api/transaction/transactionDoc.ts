
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