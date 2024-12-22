import express, { Request, Response } from "express";
import sendResponse from "../../utils/responseHelper";
import * as categoryService from "./categoryService";
import verifyToken from "../../middleware/authMiddleware";

const router = express.Router();


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       500:
 *         description: Error fetching categories
 */
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        if (categories.length > 0) {
            sendResponse(res, 200, "Categories fetched successfully", categories);
        } else {
            sendResponse(res, 404, "Categories not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching categories", null, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       400:
 *         description: Invalid category ID
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error fetching category
 * */
router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid category ID");
        }
        const category = await categoryService.getCategoryById(id);
        if (category) {
            sendResponse(res, 200, "Category fetched successfully", category);
        } else {
            sendResponse(res, 404, "Category not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching category", null, error.message);
    }
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error creating category
 */

router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            return sendResponse(res, 400, "Missing required fields");
        }
        const category = await categoryService.createCategory(name);
        sendResponse(res, 201, "Category created successfully", category);
    } catch (error: any) {
        sendResponse(res, 500, "Error creating category", null, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid category ID or missing required fields
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error updating category
 * */

router.put("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name } = req.body;
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid category ID");
        }
        if (!name) {
            return sendResponse(res, 400, "Missing required fields");
        } else {
            const category = await categoryService.updateCategory(id, name);
            if (category) {
                sendResponse(res, 200, "Category updated successfully", category);
            } else {
                sendResponse(res, 404, "Category not found");
            }
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error updating category", null, error.message);
    }
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400: 
 *         description: Invalid category ID
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error deleting category
 * */

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid category ID");
        }
        const category = await categoryService.deleteCategory(id);
        if (category) {
            sendResponse(res, 200, "Category deleted successfully", category);
        } else {
            sendResponse(res, 404, "Category not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error deleting category", null, error.message);
    }
});

export default router;