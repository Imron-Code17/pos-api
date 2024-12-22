import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

const generateToken = (userId: number, email: string) => {
    const payload = { userId, email };
    const secret = process.env.JWT_SECRET || "-";
    const options = { expiresIn: "1h" };

    return jwt.sign(payload, secret, options);
};

export { generateToken };
