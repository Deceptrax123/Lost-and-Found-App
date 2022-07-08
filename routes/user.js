
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
        res.redirect("/users/login");
    }
})

router.get("/logout",function(req,res)
{
    req.logout(function(err){});

    res.redirect("/users/register");
})


router.post("/register",async function(req,res)
{
    try
    {
        await User.register({username: req.body.username,email: req.body.email,dob:req.body.dob,contact:req.body.contact},req.body.password);

        res.redirect("/users/login");
    }catch(err)
    {
        console.log(err);
        res.redirect("/users/register");
       
    }

});


router.post("/login",async function(req,res)
{
    try{
        const user=await User.findOne({username:req.body.username})

        if(user){
            req.login(user,function(err)
            {
                if(err)
                {
                    console.log(err);
                    res.redirect("/users/login");
                }
                else
                {
                    passport.authenticate("local")(req,res,function(){
                        res.redirect("/users/dashboard");
                    })
                }
            })
        }
    }catch(err)
    {
        console.log(err);
        res.redirect("/users/login");
    }
})
module.exports=router;