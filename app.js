const express = require ('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const user = require('./Routes/userRoute')
const product = require('./Routes/productRoute') 
const app = express()

app.use(cookieParser())

app.use(express.json({
    limit:"50mb",
    extended:true
}))
app.use(bodyParser.urlencoded({
    limit:"50mb",
    extended:true
}))

app.use('/api/v1/user',user)
app.use('/api/v1/product',product)

module.exports=app