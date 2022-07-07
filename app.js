
require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const user=require("./routes/user");
const session=require("express-session");
const passport=require("passport");
const User=require("./models/users");

const passportLocalMongoose=require("passport-local-mongoose");

const app=express();

mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true});

app.use(session({
    secret:process.env.TOKEN,
    resave:false,
    saveUninitialized:true,
    
}))

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);


app.get("/",function(req,res)
{
    console.log(req.session.cookie);
    res.send("Home page");
});

app.use("/",user);

app.listen(process.env.PORT,function()
{
    console.log("Server running on port " + process.env.PORT);
})