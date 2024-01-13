import { User } from "../models/User.js";

export const homeController = (req,res) => {
    const user = new User();
    console.log(user.create("dasdas@fasd","asdasd","admin","asdsad"));
    res.status(200).json({message:"hello"});
};