
require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const socket=require("socket.io");
const user=require("./api/user");
const dashboard=require("./api/dashboard");
const chat=require("./api/chat");
const session=require("express-session");
const passport=require("passport");
const ejs=require("ejs");

const passportLocalMongoose=require("passport-local-mongoose");

const app=express();

const server=app.listen(process.env.PORT,function()
{
    console.log("Server running on port " + process.env.PORT);
})

const io=socket(server);

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


app.get("/",function(req,res)
{
    console.log(req.session.cookie);
    res.send("Home page");
});

app.use("/users",user);
app.use("/users/dashboard",dashboard);

require("./config/socket")(io);
app.use("/users/dashboard/chat",chat);

