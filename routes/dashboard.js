const User=require("../models/users");
const router=require("express").Router();
const passport=require("passport");
const bodyParser=require("body-parser");
const lostItem=require("../controller/lostItemData");
const getLostItems=require("../controller/getLostItems");

router.use(bodyParser.urlencoded({ extended:true}));


//Get contact details of users.
router.get("/contact/:name",async (req,res)=>{
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
               res.status(404).send("Oops wrong page");
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

//Get dashboard for list of all lost items.
router.get("/",async (req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            const items=await getLostItems();

            if(items===0)
            {
                res.send("Oops something went wrong");
            }
            else
            {
                res.send(items);
            }
        }catch(err)
        {
            res.send("Error!!!!");
        }
    }
    else
    {
        res.redirect("/users/login");
    }
});

//Get lost item page.
router.get("/lost",(req,res)=>{
    if(req.isAuthenticated())
    {
        res.send("Lost item page");
    }
    else
    {
        res.send("/users/login");
    }
});

//Post lost item data.
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