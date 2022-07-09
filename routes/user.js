
require("dotenv").config();
const router=require("express").Router();
const bodyParser=require("body-parser");
const passport=require("passport");
const User=require("../models/users");



router.use(bodyParser.urlencoded({extended:true}));


router.get("/login",(req,res)=>
{
    res.send("This is the login page");
});

router.get("/register",(req,res)=>
{
    res.send("This is the registeration page");
});


router.get("/logout",(req,res)=>
{
    req.logout(function(err){});

    res.redirect("/users/register");
});


router.post("/register",async (req,res)=>
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


router.post("/login",async(req,res)=>
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
});



module.exports=router;