import bcrypt from "bcrypt";
import { School } from "../models/School.js";

export const createSchool = async (req, res) => {
    const { schoolName, passwordSchool, repeatPasswordSchool } = req.body;
    try {
        const saltRounds = 10;
        const school = new School();
        const existS = await school.consultSchool(schoolName);
        if (schoolName.trim() === '' || passwordSchool.trim() === '' || repeatPasswordSchool.trim() === '') {
            return res.status(400).json({ message: "Some field empty" });
        }
        if (existS.rows.length > 0) return res.status(400).json({ message: "School name already exists" });
        if (passwordSchool != repeatPasswordSchool) return res.status(400).json({ message: "Passwords does not match" });
        const encryptPass = await bcrypt.hash(passwordSchool, saltRounds);
        const data = await school.createSchool(schoolName, encryptPass);
        console.log(data)
        return res.status(200).json({ message: "School created", schoolD: data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const validateSchool = async (req, res) => {
    const { schoolName, passwordSchool } = req.body;
    if (schoolName.trim() === '' || passwordSchool === '') return res.status(400).json({ message: "Fields empty" });
    try {
        const school = new School();
        const schoolExist = await school.consultSchool(schoolName);
        if (schoolExist.rows.length <= 0) return res.status(400).json({ message: "School does not exists" });
        const schoolPass = await bcrypt.compare(passwordSchool, schoolExist.rows[0].password_school);
        if (!schoolPass) return res.status(400).json({ message: "wrong password" });
        return res.status(200).json({ idSchool: schoolExist.rows[0].id_school });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}

export const getKeySchool = async (req, res) => {
    const { schoolName } = req.body;
    if (schoolName.trim() === '') return res.status(400).json({ message: "Field empty" })
    try {
        const school = new School();
        const keyS = await school.consultSchool(schoolName);
        return res.status(200).json({message:"succesfully",keySc:keyS.rows[0].id_school});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:error})
    }
}