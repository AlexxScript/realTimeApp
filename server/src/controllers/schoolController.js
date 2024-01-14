import bcrypt from "bcrypt";
import { School } from "../models/School.js";

export const createSchool = async (req,res) => {
    const { schoolName,passwordSchool,repeatPasswordSchool } = req.body;
    try {
        const saltRounds = 10;
        const school = new School();
        const existS = await school.consultSchool(schoolName);
        if (schoolName.trim() === '' || passwordSchool.trim() === '' || repeatPasswordSchool.trim() === '') {
            return res.status(400).json({ message: "Some field empty" });
        }
        if (existS.rows.length > 0) return res.status(400).json({ message: "School name already exists" });
        if (passwordSchool != repeatPasswordSchool) return res.status(400).json({ message: "Passwords does not match" });
        const encryptPass = await bcrypt.hash(passwordSchool,saltRounds);
        await school.createSchool(schoolName,encryptPass);
        return res.status(200).json({ message: "School created"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
}