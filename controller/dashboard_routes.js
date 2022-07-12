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

            res.render("profile",{user:user,items:items,message:""});
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
        res.render("report",{message:""});
    }
    else
    {
        res.redirect("/users/login");
    }
};

const postItems=async (req,res)=>{
    if(req.isAuthenticated())
    {
        try{
            let user=await User.findOne({username:req.user.username});
            try{
                let validate=await lostItem(user,req.body.name,req.body.category,req.body.description,req.body.place,req.body.date);

                if(validate)
                {
                    res.render("report",{message:"Item successfully added"});
                }
                else
                {
                    res.render("report",{message:"There was an error in one or more fields. Try again"});
                }
            }catch(err)
            {
                res.render("report",{message:err});
            }
        }catch(err)
        {
            res.render("report",{message: "Invalid request"});
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
            const user=await User.findOne({username:req.user.username});
            const items=await getProfile(user);

            try{
                const flag=await validateDeleteItem(req.body.button);

                if(flag)
                {
                    res.render("profile",{user:user,items:items,message:"Item successfully deleted"})
                }
                else
                {
                    res.render("profile",{user:user,items:items,message:"Error in deleting item. Please try again"});
                }
            }catch(err)
            {
                res.render("profile",{user:user,items:item,message:"Oops something went wrong."})
            }
        }catch(err)
        {
            res.redirect("/users/dashboard/profile");
        }
    }
    else
    {
        res.redirect("/users/login");
    }
};
module.exports={profile,getItems,getItemPage,postItems,getFoundDetails,deleteItem};