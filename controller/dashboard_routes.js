const Item=require("../models/lost_items");
const User=require("../models/users");
const passport=require("passport");
const bodyParser=require("body-parser");
const lostItem=require("../helpers/lostItemData");
const getLostItems=require("../helpers/getLostItems");

const getContactInfo=async (req,res)=>{
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
};

const getItems=async (req,res)=>{
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
};

const getItemPage=(req,res)=>{
    if(req.isAuthenticated())
    {
        res.send("Lost item page");
    }
    else
    {
        res.send("/users/login");
    }
};

const postItems=async (req,res)=>{
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
};


module.exports={getContactInfo,getItems,getItemPage,postItems};