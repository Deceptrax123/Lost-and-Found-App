
require("dotenv").config();
const router=require("express").Router();
const bodyParser=require("body-parser");
const passport=require("passport");
const User=require("../models/users");


router.use(bodyParser.urlencoded({extended:true}));


router.get("/login",function(req,res)
{
    res.send("This is the login page");
});

router.get("/register",function(req,res)
{
    res.send("This is the registeration page");
});


router.get("/dashboard",function(req,res)
{
    if(req.isAuthenticated())
    {
        res.send("Welcome to dashboard")
    }
    else
    {
        res.redirect("/login");
    }
})

router.get("/logout",function(req,res)
{
    req.logout(function(err){});

    res.redirect("/register");
})


router.post("/register",function(req,res)
{
    User.register({username:req.body.username},req.body.password,function(err,user)
    {
        if(err)
        {
            console.log(err);
            res.redirect("/register");
        }
        else
        {
            res.redirect("/login");
        }
    })
})

router.post("/login",function(req,res)
{
    const user=new User({
        username:req.body.username,
        password:req.body.password
    })

    req.login(user,function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/dashboard");
            })
        }
    })
})

module.exports=router;