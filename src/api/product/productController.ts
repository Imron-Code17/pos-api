import express, { Request, Response } from "express";
import sendResponse from "../../utils/responseHelper";
import * as productService from "./productService";
import verifyToken from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const categoryId = parseInt(req.query.categoryId as string);
        console.log(categoryId);
        if (isNaN(categoryId)) {
            const products = await productService.getAllProducts();
            return sendResponse(res, 200, "All Products fetched successfully", products);
        }
        const products = await productService.getProductByCategory(categoryId);
        return sendResponse(res, 200, "Products by category fetched successfully", products);
    } catch (error: any) {
        return sendResponse(res, 500, "Error fetching products", null, error.message);
    }
});


router.get("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid product ID");
        }
        const product = await productService.getProductById(id);
        if (product) {
            sendResponse(res, 200, "Product fetched successfully", product);
        } else {
            sendResponse(res, 404, "Product not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error fetching product", null, error.message);
    }
});


router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const { name, price, stock, categoryId } = req.body;
        if (!name || !price || !stock || !categoryId) {
            return sendResponse(res, 400, "Missing required fields");
        }

        const product = await productService.createProduct(name, price, stock, categoryId);
        sendResponse(res, 201, "Product created successfully", product);
    } catch (error: any) {
        sendResponse(res, 500, "Error creating product", null, error.message);
    }
});

router.put("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const { name, price, stock, categoryId } = req.body;

        // Validasi input
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid product ID");
        }
        if (!name || !price || !stock || !categoryId) {
            return sendResponse(res, 400, "Missing required fields");
        }

        const product = await productService.updateProduct(id, name, price, stock, categoryId);
        if (product) {
            sendResponse(res, 200, "Product updated successfully", product);
        } else {
            sendResponse(res, 404, "Product not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error updating product", null, error.message);
    }
});

router.delete("/:id", verifyToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return sendResponse(res, 400, "Invalid product ID");
        }

        const product = await productService.deleteProduct(id);
        if (product) {
            sendResponse(res, 200, "Product deleted successfully", product);
        } else {
            sendResponse(res, 404, "Product not found");
        }
    } catch (error: any) {
        sendResponse(res, 500, "Error deleting product", null, error.message);
    }
});

export default router;
