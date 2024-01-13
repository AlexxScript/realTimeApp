import { User } from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const user = new User();
        // const {userEmail,userName,role,password} = req.body;

        const checkExis = await user.usersExist("dasdas@fasd", "asdasd");
        if (checkExis.rows.length > 0) {
            return res.status(400).json("User name or email exists");
        }
        return res.status(200).json("usercreated");
    } catch (error) {
        console.log(error);
        return res.status(500).json('internal server error');
    }

}