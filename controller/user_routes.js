const User=require("../models/users");
const passport=require("passport");
const {emailUniqueCheck}=require("../helpers/register");



const getLogin=(req,res)=>
{
    res.render("login",{message:""});
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
                    
                    res.render("login",{message:err});
                }
                else
                {
                    passport.authenticate("local",function(err,user,info){
                        if(err)
                        {
                            res.render("login",{message:err});
                        }
                        else if(!user)
                        {
                            res.render("login",{message:"Incorrect username or password"});
                        }
                        else
                        {
                            res.redirect("/users/dashboard");
                        }
                    })(req,res);
                }
            })
        }
        else
        {
            res.render("login",{message:"Incorrect Username or Password"});
        }
    }catch(err)
    {
       res.render("login",{message:"User does not exist"});
    }
};

module.exports={getLogin,getRegister,postRegister,postLogin};