const savePreference=require("../helpers/savePreferences");
const User=require("../models/users");
const Message=require("../models/messages");
const Preference=require("../models/preferences");
const Item=require("../models/lost_items");

let terminate=0;
const getCurrentSession=async(req,res)=>{
  if(req.isAuthenticated()){
    try{
        let session=await Message.findById(req.params.message_id);
        let owner=await User.findById(session.reciever);
        let finder=await User.findById(session.sender);

        let preference=await Preference.findOne({item_id:req.params.item_id});
        if(owner==null||finder==null||session==null){
            res.status(500).send();
        }
        else{
            res.render("current_session",{session:session,owner:owner,finder:finder,preferences:preference,currentUser:req.user.username,terminate:terminate});
        }
    }catch(err){
        res.status(500).send();
    }
  }else{
    res.redirect("/users/login");
  }
};

const getPreferencePage=async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const session=await Message.findById(req.params.message_id);
            res.render("set_preference",{session:session});
        }catch(err){
            res.status(500).send();
        }
    }else{
        res.redirect("/users/login");
    }
};
const itemFound=async(req,res)=>{
    try{
        const itemStatusChange=await Item.findByIdAndUpdate(req.params.item_id,{status:"Found"});
        try{
            const messageStatusChange=await Message.findByIdAndUpdate(req.params.message_id,{status:"Completed"});
            terminate=1;
            res.redirect("/users/dashboard/session/"+req.params.message_id+"/"+req.params.item_id);
        }catch(err){
            res.status(500).send();
        }
    }catch(err){
        res.status(500).send();
    }
};

const updateSessionStatus=async(req,res)=>{
    try{
        const removeSession=await Message.findByIdAndUpdate(req.params.message_id,{status:"Invalid"})
        terminate=1;
        res.redirect("/users/dashboard/session/"+req.params.message_id+"/"+req.params.item_id);
    }catch(err){
        res.status(500).send();
    }
};

const terminateSession=async(req,res)=>{
    try{
        const terminateSession=await Message.findByIdAndDelete(req.params.message_id);
        res.redirect("/users/dashboard/sessions");
    }catch(err){
        res.status(500).send();
    }
};

const preferences=async(req,res)=>{
    try{
        let flag=await savePreference(req.params.message_id,req.body.date,req.body.mode,req.body.toTime,req.body.fromTime);
        if(flag===1){
            res.redirect("/users/dashboard/session/"+req.params.message_id+"/"+req.params.item_id);
        }else{
            res.status(500).send();
        }
    }catch(err)
    {
       res.status(500).send();
    }
};

module.exports={getCurrentSession,preferences,getPreferencePage,itemFound,updateSessionStatus,terminateSession};