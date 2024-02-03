export const homeController = (req,res) => {
    const{email,role,idSchool,idUser}=req.user;
    return res.status(200).json({email,role,idSchool,idUser,authenticated:true});
};