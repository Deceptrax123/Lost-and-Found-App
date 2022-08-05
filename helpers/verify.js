const Item=require("../models/lost_items");
const Message=require("../models/messages");

const verify=async(item_id,message_id)=>{
    try{
        await Item.findByIdAndUpdate(item_id,{status:"Ongoing"});
        try{
            await Message.findByIdAndUpdate(message_id,{status:"Ongoing"});
        }catch(err)
        {
            return err;
        }
        return 1;
    }catch(err){
        return err;
    }
};

module.exports=verify;