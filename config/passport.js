const mongoose=require("mongoose");
const User=require("../models/users");


//configure passport.js
module.exports=function(passport)
{
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

}