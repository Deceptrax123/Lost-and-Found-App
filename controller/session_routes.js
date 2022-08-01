const savePreference=require("../helpers/savePreferences");
const User=require("../models/users");
const Message=require("../models/messages");
const Preference=require("../models/preferences");
const Item=require("../models/lost_items");

const getCurrentSession=async(req,res)=>{
  if(req.isAuthenticated()){
    try{
        let session=await Message.findbyId(req.params.message_id);
        let owner=await User.findbyId(session.reciever);
        let finder=await User.findbyId(session.sender);

        let preference=await Preference.findOne({item_id:req.params.item_id});
        if(owner==null||finder==null||session==null){
            res.send("Invalid request");
        }
    }catch(err){
        console.log(err);
    }
  }else{
    res.redirect("/users/login");
  }
};

const itemFound=async(req,res)=>{
    try{
        const itemStatusChange=await Item.findByIdAndUpdate(req.params.item_id,{status:"Found"});
        try{
            const messageStatusChange=await Message.findByIdAndUpdate(req.params.message_id,{status:"completed"});
        }catch(err){
            console.log(err);
        }
        res.send("Item found");
    }catch(err){
        console.log(err);
    }
};

const removeItem=async(req,res)=>{
    try{
        const removeSession=await Message.findByIdAndUpdate(req.params.message_id,{status:""})
    }catch(err){
        console.log(err);
    }
};

const terminateSession=async(req,res)=>{
    try{
        const terminateSession=await Message.findByIdAndDelete(req.params.message_id);
        res.redirect("/users/dashboard/sessions");
    }catch(err){
        console.log(err);
    }
};

const preferences=async(req,res)=>{
    try{
        let flag=await savePreference(req.body.date,req.body.mode,req.body.toTime,req.body.fromTime);

        res.send("Preferences saved.");
    }catch(err)
    {
        console.log(err)//handle error here.
    }
};

module.exports={getCurrentSession,preferences};