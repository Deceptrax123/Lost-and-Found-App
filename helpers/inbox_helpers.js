const Item = require("../models/lost_items");
const User=require("../models/users");

const getSender=async(messages)=>{
    try{
        let senders=[];

        for(let i=0;i<messages.length;i++){
            let sender=await User.findById(messages[i].sender);
            senders[i]=sender.username;
        }
        return senders;
    }catch(err){
        return 0;
    }
}
const getItemNames=async(messages)=>{
    try{
        let items=[];
        for(let i=0;i<messages.length;i++){
            let item=await Item.findById(messages[i].item_id);
            items[i]=item.name;
        }
        return items;
    }catch(err){
        return 0;
    }
}

module.exports={getSender,getItemNames};