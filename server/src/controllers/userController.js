import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { createToken } from "../libs/jToken.js";

export const createUser = async (req, res) => {
    try {
        const { userEmail, userName, password, repeatPassword } = req.body;
        const user = new User();
        const saltRounds = 10;
        if (password != repeatPassword) return res.status(400).json({ message: 'password does not match' });
        if (userEmail.trim() === '' || userName.trim() === '') {
            return res.status(400).json({ message: "Field empty" })
        };
        const checkExis = await user.usersExist(userEmail, userName);
        if (checkExis.rows.length > 0) return res.status(400).json({ message: "User name or email already exists" });
        const pass = await bcrypt.hash(password, saltRounds);
        const checkAll = await user.usersSelectAll();
        if (checkAll.rows.length <= 0) {
            await user.create(userEmail, userName, 'ADMIN', pass);
            return res.status(200).json({ message: "usercreated" });
        }
        await user.create(userEmail, userName, 'CLIENT', pass);
        return res.status(200).json({ message: "usercreated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'internal server error' });
    }

}

export const logInUSer = async (req,res) => {
    try {
        const { userEmail, password } = req.body;
        const user = new User();
        const userSelect = await user.selectUser(userEmail);
        if (userSelect.rows.length<=0) return res.status(400).json({message:"Email does not exist"});
        const checkPass = await bcrypt.compare(password,userSelect.rows[0].password);
        if (!checkPass) return res.status(400).json("Wrong password");
        const token = createToken(userSelect.rows[0].email_users,userSelect.rows[0].users_name,userSelect.rows[0].role);
        res.cookie("token",token,{
            sameSite:'none',
        });
        res.json({ message:"succes",token,state:"authenticated" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}