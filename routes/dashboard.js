const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");
const lostItem=require("../controller/lostItemData");

router.use(bodyParser.urlencoded({ extended:true}));


//Getting details of Users.
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
            res.send("Oops something went wrong");
        }
    }
    else
    {
        res.redirect("/users/login");
    }
});

//Posting lost item data.
router.post("/lost",async (req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            let user=await User.findOne({username:req.user.username});
            
            let validate=await lostItem(user,req.body.name,req.body.category,req.body.description,req.body.place,req.body.date);

            if(validate)
            {
                res.send("Item successfully added");
            }
            else
            {
                res.send("There was an error. Try again");
            }
        }catch(err)
        {
            res.send("oops something went wrong");
        }
    }
    else
    {
        res.redirect("/users/login");
    }
});



module.exports=router;