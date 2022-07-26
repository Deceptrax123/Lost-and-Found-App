const Item=require("../models/lost_items");
const Message=require("../models/messages");

const verify=async(id)=>{
    try{
        await Item.findByIdAndUpdate(id,{status:"Ongoing"});
        try{
            await Message.updateOne({item_id:id},{status:"Ongoing"});
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