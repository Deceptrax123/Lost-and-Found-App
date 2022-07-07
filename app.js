
require('dotenv').config()
const express=require("express");
const mongoose=require("mongoose");
const user=require("./routes/user")

const app=express();

app.get("/",function(req,res)
{
    res.send("Home page");
});

app.use("/",user)


app.listen(process.env.PORT,function()
{
    console.log("Server running on port " + process.env.PORT);
})