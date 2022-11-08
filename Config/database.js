const mongoose = require("mongoose")
const connection=()=>{
    mongoose.connect(process.env.MONGO_URI).then((res)=>{
        console.log('database connected')
        // console.log(res)
    }).catch((err)=>{
        console.log('database not connected')
        console.log(err)
    })
}

// const db = mongoose.connection

module.exports=connection