const Item=require("../models/lost_items");
const User=require("../models/users");
const passport=require("passport");
const bodyParser=require("body-parser");
const getProfile=require("../helpers/profile");
const lostItem=require("../helpers/lostItemData");
const getLostItems=require("../helpers/getLostItems");
const getFoundItem=require("../helpers/getFoundItemUser");
const validateDeleteItem=require("../helpers/deleteItem");
const fs=require('fs');
const path=require('path');

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
            res.render("dashboard",{items:items,matchedItems:items});
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
            console.log(req.file);
            let img={
                data:fs.readFileSync(path.join("./public/uploads/"+req.file.filename)),
                content:"image/png"
            };

            console.log(img);
            let user=await User.findOne({username:req.user.username});

            
            try{
               

                let validate=await lostItem(user,req.body.name,req.body.category,img,req.body.description,req.body.place,req.body.date);

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
                    res.redirect("/users/dashboard/profile");
                }
                else
                {
                    res.render("profile",{user:user,items:items,message:"Error in deleting item. Please try again"});
                }
            }catch(err)
            {
                res.render("profile",{user:user,items:items,message:"Oops something went wrong."})
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


const search=async(req,res)=>{
    const date=req.body.date;
    const category=req.body.category;

    let matchedItems=[];

    try{
        let items=await Item.find({});

        if(date!="" && category!="Category")
        {
            matchedItems=await Item.find({date:date,category:category});
        }
        else if(date==="")
        {
            matchedItems=await Item.find({category:category});
        }
        else
        {
            matchedItems=await Item.find({date:date});
        }

        if(matchedItems.length!=0)
        {
            res.render("dashboard",{items:items,matchedItems:matchedItems});
        }
        else
        {
            res.redirect("/users/dashboard");
        }
    }catch(err)
    {
        res.redirect("/users/dashboard");
    }
};

module.exports={profile,getItems,getItemPage,postItems,getFoundDetails,deleteItem,search};