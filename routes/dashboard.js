const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");

router.use(bodyParser.urlencoded({ extended:true}));


router.get("/:name",async (req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            let user=await User.findOne({username:req.params.name});

            if(user)
            {
               res.send(user)
            }
            else
            {
               res.status(400).send("Oops wrong page");
            }
        }catch(err)
        {
            res.direct("Oops something went wrong");
        }
    }
    else
    {
        res.redirect("/");
    }
});



module.exports=router;