
require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const user=require("./api/user");
const dashboard=require("./api/dashboard");
const retrieve=require("./api/retrieve");
const missing=require("./api/session");
const session=require("express-session");
const passport=require("passport");
const ejs=require("ejs");

const passportLocalMongoose=require("passport-local-mongoose");

const app=express();

const server=app.listen(process.env.PORT,function()
{
    console.log("Server running on port " + process.env.PORT);
})

require("./config/db")(mongoose);

app.use(session({
    secret:process.env.TOKEN,
    resave:false,
    saveUninitialized:true,
    
}))

app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

require("./config/passport")(passport);



app.use("/users",user);
app.use("/users/dashboard",dashboard);
app.use("/users/dashboard/report",retrieve);
app.use("/users/dashboard/session",missing);
