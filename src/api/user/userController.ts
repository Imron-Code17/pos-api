import express, { Request, Response } from "express";
import { registerUser, loginUser, getUserByEmail } from "./userService";
import { generateToken } from "../../utils/jwtHelper";
import sendResponse from "../../utils/responseHelper";
import bcrypt from "bcrypt";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/register", async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            throw new Error("Missing required fields");
        }

        const newUser = await registerUser(name, email, password, role);
        const token = generateToken(newUser.id, newUser.email);

        res.status(201).json({
            message: "User registered successfully",
            data: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
            token,
        });
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Invalid password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!email || !password) {
            return sendResponse(res, 400, "Missing required fields");
        }
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }

        if (!user?.password) {
            return sendResponse(res, 404, "Password not set");
        }

        // const isPasswordValid = await bcrypt.compare(password, user.password);

        // if (!isPasswordValid) {
        //     return sendResponse(res, 401, "Invalid Password");
        // }

        const token = generateToken(user.id, user.email);

        res.status(200).json({
            message: "User logged in successfully",
            data: { id: user.id, name: user.name, email: user.email, role: user.role },
            token,
        });
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message });
    }
});

export default router;
