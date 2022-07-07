const express=require("express");
const router=express.Router();



router.get("/login",function(req,res)
{
    res.send("This is the login page");
});

router.get("/register",function(req,res)
{
    res.send("This is the registeration page");
});

module.exports=router;