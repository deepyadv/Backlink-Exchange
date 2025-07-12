export const isAdmin  = async (req , res, next ) =>{

    if(req.user.role !== "admin"){
        return res.status(404).json({
            msg: "Access denied: Not an admin"
        })
    }
    next()
}