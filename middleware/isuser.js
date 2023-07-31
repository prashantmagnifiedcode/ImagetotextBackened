const createError= require("http-errors")
const JWT= require("jsonwebtoken")

const isAdminAuthenticated=(req,res,next)=>{
    const token= req.cookies['jwt_token'];
    console.log("middle war",token)
    if(!token) throw createError.Unauthorized();
     const claim= JWT.verify(token,process.env.JWT_TOKEN_SECRET)
     if(!claim) throw createError.Unauthorized()
     next()

}
module.exports = isAdminAuthenticated;