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
                await User.register({username: req.body.username,email: req.body.email,contact:req.body.contact,firstName:req.body.firstName,lastName:req.body.lastName},req.body.password);

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
       res.render("Register",{message:"An error has occured. Please try again later"})
    }
};

const postLogin=async(req,res)=>
{
    try{
        const user=await User.findOne({username:req.body.username});
        if(user){
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
                    req.login(user,(err)=>{
                        if(err){
                            res.render("login",{message:err});
                        }else{
                            res.redirect("/users/dashboard")
                        }
                    })
                }
            })(req,res);
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

const logOut=(req,res)=>{
   req.logout((err)=>{
    if(err){
        res.status(500).send("Internal server error");
    }else{
        res.redirect("/users/login");
    }
   })
}

module.exports={getLogin,getRegister,postRegister,postLogin,logOut};