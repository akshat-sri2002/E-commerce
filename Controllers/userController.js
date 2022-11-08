const User = require('../Models/userModel')

const jwt = require('jsonwebtoken')
const catchAsyncErrors = require('../Middleware/catchAsyncErrors')
const { compare } = require('bcrypt')
// exports.create = catchAsyncErrors( async (req, res, next)=>{
//     const aa = await User.findOne({email:req.body.email})
//     if(aa!=null) return res.send('user alreadyll exists')
//         if(req.body.pwd!=req.body.conPwd){
//              res.send('password not match')
//              return; 
//          }
//          const user = await User.create(req.body)
//         res.cookie('token',user.getJwtToken()).json({
//             success:true,
//             user
//         }) 
// })
exports.create = async (req,res) => {
    try{
        // console.log('hi')
        // console.log(req.body)
        // console.log(req.query);
        // console.log(req.params.id)
        // await User.create(req.body)
        // res.send('this is create')
        // console.log(req.body.email)
        const aa = await User.findOne({email:req.body.email})
        // console.log(aa.name)
        if(aa!=null) return res.send('user alreadyll exists')
        if(req.body.pwd!=req.body.conPwd){
            res.send('password not match')
            return; 
        }
        // const user = await User.create({
        //     name:req.body.name,
        //     email:req.body.email,
        //     pwd:req.body.pwd
        // })
        const user = await User.create(req.body)
        res.cookie('token',user.getJwtToken()).json({
            success:true,
            user
        }) 
    }
    catch(e){
       console.log(e) 
       res.sendStatus(500)
    }
}
exports.read = async (req,res) => {
    try{
        // User[0]=User[0].trim()
        // console.log(JSON.parse(JSON.stringify(User[0])))
    const user = await User.findOne({email:req.body.email})
    if(user!=null){ 
        console.log(user)
        res.send(user)}
    else res.send('user not found')
        // res.send('this is read') 
    }
    catch(e){
       console.log(e) 
    }
}
exports.login = async(req,res)=>{
    try{
        
        const user = await User.findOne({email:req.body.email})
        if(user){
            // console.log(user.pwd)
            // console.log(user.pwd,req.body.pwd)
            if(! await user.compare(req.body.pwd)){
                res.send('wrong password')
            }else{
                // cookie.send('ff')
                // console.log(cookei)
                res.cookie('token',user.getJwtToken()).json({
                    success:true,
                    user
                })
                // res.send("welcome "+user.name)
            }
        }else{
            return res.send('user not found')
        }
    }catch(e){
        console.log(e)
        res.json({
            success:false
        })
    }
}
exports.logout = async (req,res)=>{
    try{
        res.cookie('token',null).json({
            staus:"logout"
        })
    }
    catch{

    }
}
exports.put = async (req,res) => {
    try{
        res.send('this is put')
    }
    catch(e){
       console.log(e) 
    }
}
exports.patch = async (req,res) => {
    try{
        
    }
    catch(e){
       console.log(e) 
    }
}
exports.Delete = async (req,res) => {
    try{
        console.log(22)
        // console.log(req.params.__id)
        await User.deleteOne({_id:req.params._id})
        res.send('/back')
    }
    catch(e){
       console.log(e) 
    }
}
exports.updateUser = async(req,res)=>{
    try{
        const user = await User.findOne({_id:jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY).id})
        // console.log(req.body)
        // console.log(user._id)
        await User.updateOne({_id:user._id},req.body)
        // console.log(user)
        res.json({
            status:"user details updated"
        })
    }
    catch(e){
        console.log(e)
        res.json({
            success:false
        })
    }
}
exports.createAdmin = async( req,res)=>{
    try{
        const user = await User.findById(req.params._id);
        if(user){
            if(user.isAdmin){
                res.json({
                    message:"user is already admin"
                })
            }else{
                user.isAdmin=true
                save()
                res.json({
                    message:"admin access granted"
                })
            }
        }else{
            res.json({
                message:"user not found"
            })
        }
    }
    catch(e){
        console.log(e);
        res.json({
            success:false
        })
    }
}
exports.changePwd =  async (req, res) =>{
    try{
        const user = await User.findOne({_id:jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY).id})
        // console.log(user)
        if(req.body.currentPwd === user.pwd){
            if(req.body.newPwd === req.body.confirmNewPwd){
                user.pwd = req.body.newPwd
                await user.save()
                // const afterUser = await User.findOne({_id:jwt.verify(req.cookies.token,process.env.JWT_SECRET_KEY).id})
                // console.log(afterUser)
                res.json({
                    success:true,
                    status:"password changed succesfully"
                })
            }else{
                res.json({
                    staus:"password not match"
                }) 
            }
        }else{
            res.json({
                staus:"wrong password"
            })
        }
    }
    catch(e){
        console.log(e)
        res.json({
            success:false
        })
    }
    
}
exports.getAllUser = async (req,res)=>{
    try{
        const users = await User.find()
        res.json({
            users
        })
        
    }
    catch(e){
        console.log(e)
    }
}
exports.dummyApi = async (req,res)=>{
    try{
        // console.log(process.env.JWT_SECRET_KEY)
        // const token =jwt.sign({name:"akshat",age:"20"},process.env.JWT_SECRET_KEY,{expiresIn:15})
        // console.log(token)
        // const verified = jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log(verified)
        // res.status(200).json({
        //     success:true
        // })
        // const size= JSON.stringify(req.headers.cookie).length
        // console.log(size)
        // console.log(JSON.stringify(req.headers.cookie).slice(7,size-1)).end()


        // console.log(req.headers['authorization'])
        // console.log(req.header('cookie').slice(6))
        // console.log(req.headers)
        // console.log(req.headers['authorization'])
        console.log(User.Model)
        console.log(req.cookie)
        // console.log(req.headers.cookie)
        
        
    }
    catch(e){

    }
}

