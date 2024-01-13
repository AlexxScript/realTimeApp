import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export function createToken(email, userName, role) {
    const token = jwt.sign(
        {
            email,
            userName,
            role
        },
        process.env.JWT_SECRET
    );
    return token;
}