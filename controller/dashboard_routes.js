const Item=require("../models/lost_items");
const User=require("../models/users");
const Message=require("../models/messages");
const {getProfileItems,getProfileMessages}=require("../helpers/profile");
const lostItem=require("../helpers/lostItemData");
const getLostItems=require("../helpers/getLostItems");
const getSenders=require("../helpers/senders");
const getFoundItemUser=require("../helpers/getFoundItemUser");
const validateDeleteItem=require("../helpers/deleteItem");
const getSessionItems=require("../helpers/sessionItems");
const fs=require('fs');
const path=require('path');

let message="";
const getMessages=async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            let user=await User.findOne({username:req.user.username});
            try{
                let messages=await getProfileMessages(user);

                try{
                    let senders=await getSenders(messages);
                    if(senders===0){
                        res.status(500).send("Internal Server Error");
                    }else{
                        res.render("inbox",{messages:messages,senders:senders});
                    }
                }catch(err){
                    res.status(500).send("Internal server error");
                }
              
            }catch(err){
               res.status(500).send("Internal Server Error");//handle error here.
            }
        }catch(err)
        {
           res.status(500).send("Internal Server Error"); //handle error here.
        }
    }else{
        res.redirect("/users/login");
    }
};

const getSessions=async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const user=await User.findOne({username:req.user.username});
            try{
                const messages=await Message.find({status:"Ongoing",$or:[{reciever:user._id},{sender:user._id}]});
                try{
                    const items=await getSessionItems(messages);

                    res.render("list_sessions",{sessions:messages,user_id:user._id,items:items});
                }catch(err){
                   res.status(500).send("Internal Server Error");
                }
            }catch(err){
               res.status(500).send("Internal Server Error");
            }
        }catch(err){
           res.status(500).send("Internal Server Error"); //handle error here.
        }
    }else{
        res.redirect("/users/login");
    }
};

const getProfile=async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const user =await User.findOne({username:req.user.username});
            try{
                const items=await getProfileItems(user);   
                res.render("profile",{user:user,items:items,message:message});
            }catch(err){
               res.status(500).send("Internal Server Error");
            }
        }catch(err){
           res.status(500).send("Internal Server Error");
        }
    }else{
        res.redirect("/users/login");
    }
};

const getItems=async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const items=await Item.find({status:{$ne:"Found"}});
            res.render("dashboard",{items:items,matchedItems:items,username:req.user._id});
        }catch(err)
        {
           res.status(500).send("Internal Server Error");
        }
    }else{
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
                let img={
                    data:fs.readFileSync(path.join("./public/uploads/"+req.file.filename)),
                    content:"image/png"
                };
                let validate=await lostItem(user,req.body.name,req.body.category,img,req.body.description,req.body.place,req.body.date);
                if(validate){
                    res.render("report",{message:"Item successfully added"});
                }else{
                    res.render("report",{message:"There was an error in one or more fields. Try again"});
                }
            }catch(err){
                res.render("report",{message:"Image is required"});
            }
        }catch(err){
          res.status(500).send("Internal Server Error");
        }
    }else{
        res.redirect("/users/login");
    }
};

const getFoundDetails=async (req,res)=>{
    if(req.isAuthenticated()){
        try{
            const user=await getFoundItemUser(req.params.id);
            try{
                const item=await Item.findOne({_id:req.params.id});

                if(user===0||item===null){
                    res.redirect("/users/dashboard");
                }else{
                    res.render("item_details",{item:item,user:user});
                }
            }catch(err){
               res.status(500).send("Internal Server Error");
            }
        }catch(err){
            res.redirect("/users/dashboard");
        }
    }else{
        res.redirect("/users/login"); //handle an error here.
    }
};

const deleteItem=async (req,res)=>{
    if(req.isAuthenticated()) {    
        try{
            const flag=await validateDeleteItem(req.body.button);
            if(flag){
                message="";
            }else{
                message="Error in deleting item. Please try again";
            }
            res.redirect("/users/dashboard/profile");
        }catch(err){
            message="Oops something went wrong";
            res.redirect("/users/dashboard/profile");
        }
    }else{
        res.redirect("/users/login");
    }
};

const search=async(req,res)=>{
    const date=req.body.date;
    const category=req.body.category;
    let matchedItems=[];
    try{
        let items=await Item.find({});
        try{
            if(date!="" && category!="Category"){
                matchedItems=await Item.find({date:date,category:category});
            }else if(date===""){
                matchedItems=await Item.find({category:category});
            }else{
                matchedItems=await Item.find({date:date});
            }
            res.render("dashboard",{items:items,matchedItems:matchedItems,username:req.user.username});
        }catch(err){
           res.status(500).send("Internal Server Error");
        }
    }catch(err){
        res.redirect("/users/dashboard");
    }
};

module.exports={getMessages,getItems,getItemPage,postItems,getFoundDetails,deleteItem,search,getSessions,getProfile};