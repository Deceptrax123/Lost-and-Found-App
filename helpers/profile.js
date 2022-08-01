const Item=require("../models/lost_items");
const Message=require("../models/messages");

const getProfileItems=async(user)=>{
    try{
        const items=await Item.find({owner:user._id});
        
        return items;
    }catch(err){
        return err;
    }
};

const getProfileMessages=async(user)=>{
    try{
        const messages=await Message.find({reciever:user._id,status:{$ne:"Ongoing"}});

        return messages;
    }catch(err){
        return err;
    }
};  
module.exports={getProfileItems,getProfileMessages};