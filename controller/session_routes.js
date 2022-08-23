const savePreference=require("../helpers/savePreferences");
const User=require("../models/users");
const Message=require("../models/messages");
const Preference=require("../models/preferences");
const Item=require("../models/lost_items");


const getCurrentSession=async(req,res)=>{
  if(req.isAuthenticated()){
    try{
        let session=await Message.findById(req.params.message_id);
        let owner=await User.findById(session.reciever);
        let finder=await User.findById(session.sender);
        let item=await Item.findById(session.item_id);

        let preference=await Preference.findOne({message_id:req.params.message_id});
        if(owner==null||finder==null||session==null||item==null){
            res.status(500).send("Internal Server Error");
        }
        else{
            res.render("current_session",{session:session,owner:owner,finder:finder,preferences:preference,currentUser:req.user.username,item:item});
        }
    }catch(err){
        res.status(500).send("Internal Server Error");
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
            res.status(500).send("Internal Server Error");
        }
    }else{
        res.redirect("/users/login");
    }
};
const itemFound=async(req,res)=>{
    try{
        const itemStatusChange=await Item.findByIdAndUpdate(req.params.item_id,{status:"Found"});
        try{
            const terminateSession=await Message.findByIdAndDelete(req.params.message_id);
            res.redirect("/users/dashboard/sessions");
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
        
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
};

const updateSessionStatus=async(req,res)=>{
    try{
        const itemStatusChange=await Item.findByIdAndUpdate(req.params.item_id,{status:"Reported"});
        try{
            const terminateSession=await Message.findByIdAndDelete(req.params.message_id);
            res.redirect("/users/dashboard/sessions");
        }catch(err){
            res.status(500).send("Internal Server Error");
        }
    
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
};

const preferences=async(req,res)=>{
    try{
        let flag=await savePreference(req.params.message_id,req.body.date,req.body.mode,req.body.toTime,req.body.fromTime);
        if(flag===1){
            res.redirect("/users/dashboard/session/"+req.params.message_id+"/"+req.params.item_id);
        }else{
            res.status(500).send("Internal Server Error");
        }
    }catch(err)
    {
       res.status(500).send("Internal Server Error");
    }
};

module.exports={getCurrentSession,preferences,getPreferencePage,itemFound,updateSessionStatus};