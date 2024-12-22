import express, { Request, Response } from "express";
import sendResponse from "../../utils/responseHelper";
import * as categoryService from "./categoryService";
import verifyToken from "../../middleware/authMiddleware";

const router = express.Router();

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