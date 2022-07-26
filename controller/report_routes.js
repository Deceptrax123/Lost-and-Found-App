
const saveMessage=require("../helpers/message");
const verify=require("../helpers/verify");
const invalid=require("../helpers/invalid_report");
const savePreference=require("../helpers/savePreferences");
const Item=require("../models/lost_items");
const Message=require("../models/messages");
const User=require("../models/users");
const fs=require('fs');
const path=require('path');

const fileReport=(req,res)=>{
    if(req.isAuthenticated()){
        res.render("fileReport",{id:req.params.id,message:""});
    }else{
        res.redirect("/users/login");
    }
};

const ongoingSession=(req,res)=>{
    if(req.isAuthenticated()){
        res.send("This is an item currently being delivered");
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
        console.log(err); //handle error here.
    }
};

const verifyReport=async(req,res)=>{
    const val=await verify(req.body.button);
    try{
        if(val===1){
            res.send("Sender verified");
        }else{
            res.send("an error has occured");
        }
    }catch(err){
        console.log(err); //handle error here.
    }

};

const deleteReport=async(req,res)=>{
    try{
        await Message.findByIdAndDelete(req.body.button);
        res.send("Message deleted");
    }catch(err)
    {
        res.send("Oops an error occured.");
    }
}

const invalidReport=async(req,res)=>{
    try{
        const sendMessage=await invalid(req.body.button,req.body.reason);
        
        if(sendMessage===1) {
            await Message.findByIdAndRemove(req.body.button);
            res.send("Request successully removed");
        } else {
            res.send("Error, try again later");
        }
    }catch(err)
    {
        console.log(err);//handle error here.
    }
};

const preferences=async(req,res)=>{
    try{
        let flag=await savePreference(req.body.date,req.body.mode,req.body.toTime,req.body.fromTime);

        res.send("Preferences saved.");
    }catch(err)
    {
        res.send(err);//handle error here.
    }
};

module.exports={fileReport,ongoingSession,sendReport,verifyReport,deleteReport,invalidReport,preferences};