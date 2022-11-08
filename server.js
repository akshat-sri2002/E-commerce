const mongoose = require('mongoose')
// const express = require('express')
const dotenv = require('dotenv')
const db = require('./Config/database')
// const user = require('./Models/userModel')
// const app = express()
const app = require('./app.js')
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting the server due to UnCaught Exception');
    process.exit(1); // to get exit
})
dotenv.config({path:'./Config/.env'})
db()

// app.get('/',(req,res)=>{
//     res.send('hi sir ji')
// })

const server =app.listen(process.env.PORT,()=>{
    console.log('connected successfully')
})
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting the server due to UnHandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});
