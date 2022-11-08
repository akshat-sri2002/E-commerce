const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

const isAuthenticatedUser = async (req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token){
            res.status(401).json({
                message : "please login"
            })
        }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const {id} = decodedToken
        req.user = await User.findById(id)
        next()
        console.log(decodedToken)
        console.log("success")
    }
    catch(e){

    }
}
const isAdmin = async ( req ,res, next)=>{
    try{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(401).json({
                message:"you are not admin"
            })
        }
    }
    catch(e){

    }
}
module.exports={isAuthenticatedUser,isAdmin}