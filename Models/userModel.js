const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const validator = require ('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"please enter valid email"]
    },
    pwd:{
        type:String,
        // select:false,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY)
}
userSchema.pre("save",async function(next){
    if(!this.isModified("pwd")){ // this is used to prevent the password from again hashing itself while we update the user data.
        next();
    }
    this.pwd = await bcrypt.hash(this.pwd,10)
})
userSchema.methods.compare = async function(pwd){
    return await bcrypt.compare(pwd,this.pwd)
}
// userSchema.methods.findID = function(){} 

// const userDetail = new mongoose.model('userDetail',userSchema)

module.exports = new mongoose.model('user',userSchema)