const User=require("../models/users");
const passport=require("passport");
const {emailUniqueCheck}=require("../helpers/register");



const getLogin=(req,res)=>
{
    res.send("This is the login page");
};

const getRegister=(req,res)=>
{
    res.render("register",{message:""});
};

const postRegister=async (req,res)=>
{
    try
    {
        let val= await emailUniqueCheck(req.body.email,User);
        if(val===1)
        {
            try{
                await User.register({username: req.body.username,email: req.body.email,contact:req.body.contact},req.body.password);

                res.render("register",{message:"Successfully Registered"});
            }catch(err)
            {
                res.render("register",{message:err});
            }
        }
        else
        {
            res.render("Register",{message:"Email already exists. Please enter a valid email"});
        }
    }catch(err)
    {
       res.send("Register",{message:"An error has occured. Please try again later"})
    }
};

const postLogin=async(req,res)=>
{
    try{
        const user=await User.findOne({username:req.body.username});

        if(user){
            req.login(user,function(err)
            {
                if(err)
                {
                    
                    res.redirect("/users/login");
                }
                else if(!user)
                {
                    res.send("Invalid request");
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
};

module.exports={getLogin,getRegister,postRegister,postLogin};