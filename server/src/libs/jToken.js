import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export function createToken(email, role, idSchool) {
    const token = jwt.sign(
        {
            email,
            role,
            idSchool
        },
        process.env.JWT_SECRET
    );
    return token;
}