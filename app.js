
require('dotenv').config();
const express=require("express");
const mongoose=require("mongoose");
const user=require("./routes/user");
const session=require("express-session");
const passport=require("passport");
const User=require("./models/users");

const passportLocalMongoose=require("passport-local-mongoose");

require("./config/passport")(passport);

const app=express();

mongoose.connect(process.env.MONGO_CONNECT,{useNewUrlParser:true});

app.use(session({
    secret:process.env.TOKEN,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:true}
}))

app.use(passport.initialize());
app.use(passport.session());




app.get("/",function(req,res)
{
    res.send("Home page");
});

app.use("/",user);

app.listen(process.env.PORT,function()
{
    console.log("Server running on port " + process.env.PORT);
})