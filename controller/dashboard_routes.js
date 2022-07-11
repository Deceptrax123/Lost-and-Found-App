const Item=require("../models/lost_items");
const User=require("../models/users");
const passport=require("passport");
const bodyParser=require("body-parser");
const getProfile=require("../helpers/profile");
const lostItem=require("../helpers/lostItemData");
const getLostItems=require("../helpers/getLostItems");
const getFoundItem=require("../helpers/getFoundItemUser");
const validateDeleteItem=require("../helpers/deleteItem");

const profile=async (req,res)=>{
   if(req.isAuthenticated())
   {
        try{
            const user=await User.findOne({username:req.user.username});
            const items=await getProfile(user);

            res.render("profile",{user:user,items:items});
        }catch(err)
        {
           res.status(404).send("404 error");
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

const getFoundDetails=async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const user=await getFoundItem(req.params.id);
            if(user===0)
            {
                res.send("Oops something went wrong");
            }
            else
            {
                res.send(user);
            } 
        }catch(err)
        {
            res.send("Error!!!");
        }
    }
    else
    {
        res.redirect("/users/login");
    }
};

const deleteItem=async (req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            flag=await validateDeleteItem(req.body.button);

            res.redirect("/users/dashboard/profile");
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
module.exports={profile,getItems,getItemPage,postItems,getFoundDetails,deleteItem};