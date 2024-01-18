import jwt from "jsonwebtoken";

export const authToken = (req,res,next) => {
    const {token} = req.cookies;

    console.log(token);
    if (!token) return res.status(401).json({
        authenticated: false,
        email: '',
        role: '',
        idSchool:null
    });
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if (err) return res.status(400).json({message:"Invalid token"});
        req.user = user;
        next();
    });
}