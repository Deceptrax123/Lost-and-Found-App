const Message=require("../models/messages");
const User=require("../models/users");

const saveMessage=async (reciever,description,img,sender,itemId )=>{
    try{
        let message=new Message({
            reciever:reciever,
            description:description,
            img:img,
            item_id:itemId,
            sender:sender,
            status:"Sent",
        });

        await message.save();
        try{
            const checker=await User.findByIdAndUpdate(reciever,{messages:message});
            
            if(checker===null){
                return 0;
            }else{
                return 1;
            }
        }catch(err){
            return err;
        }
    }catch(err){  
        return err;
    }
};

module.exports=saveMessage;