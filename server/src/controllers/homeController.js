export const homeController = (req,res) => {
    const{email,role,idSchool}=req.user;
    return res.status(200).json({email,role,idSchool,authenticated:true});
};