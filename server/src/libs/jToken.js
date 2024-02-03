import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

export function createToken(email, role, idSchool,idUser) {
    const token = jwt.sign(
        {
            email,
            role,
            idSchool,
            idUser
        },
        process.env.JWT_SECRET
    );
    return token;
}