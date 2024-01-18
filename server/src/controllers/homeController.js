import { User } from "../models/User.js";

export const homeController = (req,res) => {
    const{userName}=req.user;
    return res.status(200).json({message:`Welcome ${userName}`});
};