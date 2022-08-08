
const saveMessage=require("../helpers/message");
const verify=require("../helpers/verify");
const invalid=require("../helpers/invalid_report");
const savePreference=require("../helpers/savePreferences");
const Item=require("../models/lost_items");
const Message=require("../models/messages");
const User=require("../models/users");
const Preference=require("../models/preferences");
const fs=require('fs');
const path=require('path');

let alert="";
const fileReport=(req,res)=>{
    if(req.isAuthenticated()){
        res.render("fileReport",{id:req.params.id,message:""});
    }else{
        res.redirect("/users/login");
    }
};

const getMessage=async(req,res)=>{
    if(req.isAuthenticated()){
        try{
            const message=await Message.findById(req.params.message_id);
            try{
                const sender=await User.findById(message.sender);
                res.render("message",{message:message,sender:sender,alert:alert});
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

const sendReport=async(req,res)=>{
    try{
        let img={
            data:fs.readFileSync(path.join("./public/uploads/"+req.file.filename)),
            content:"image/png"
        };

        const reciever=await Item.findById(req.params.id);
        const sender= await User.findOne({username:req.user.username});
        const val=await saveMessage(reciever.owner,req.body.description,img,sender._id,req.params.id);
        let message="";

        if(val===1){
            message="message successfully sent";
        }else if(val===0){
            message="User not found";
        }else{
            message="Oops an error occured, try again later";
        }

        res.render("fileReport",{id:req.params.id,message:message});
    }catch(err){
       res.status(500).send("Internal Server Error");
    }
};

const verifyReport=async(req,res)=>{
    const val=await verify(req.body.verify,req.params.message_id);
    try{
        if(val===1){
            res.redirect("/users/dashboard/session/"+req.params.message_id+"/"+req.body.verify);
        }else{
            res.redirect("/users/dashboard/inbox");
        }
    }catch(err){
       res.status(500).send("Internal Server Error");
    }

};


const invalidReport=async(req,res)=>{
    try{
        await Message.findByIdAndRemove(req.body.button);
        alert="Finder claim removed successfully"
    }catch(err)
    {
       res.status(500).send("Internal Server Error");
    }
};


module.exports={fileReport,sendReport,verifyReport,invalidReport,getMessage};