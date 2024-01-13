import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const user = new User();
        const saltRounds = 10;
        // const { userEmail, userName, password } = req.body;
        const userEmail = "user3@user2";
        const userName = "user3";
        const password = "12345";
        const checkExis = await user.usersExist(userEmail, userName);
        const checkAll = await user.usersSelectAll();
        if (checkExis.rows.length > 0) return res.status(400).json({ message: "User name or email exists" });
        const pass = await bcrypt.hash(password, saltRounds);

        if (checkAll.rows.length <= 0) {
            user.create(userEmail, userName, 'ADMIN', pass);
            return res.status(200).json({ message: "usercreated" });
        }

        user.create(userEmail, userName, 'CLIENT', pass);
        return res.status(200).json({ message: "usercreated" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal server error' });
    }

}