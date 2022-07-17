const Message=require("../models/messages");
const User=require("../models/users");

const invalid=async(id,reason)=>{
    try{
        const originalMessage=await Message.findById(id);
        const user= await User.findOne({username:req.user.username});

        const invalidMessage=new Message({
            reciever:originalMessage.sender,
            description:reason,
            sender:user._id,
        })
        
        await invalidMessage.save();

        return 1;

    }catch(err){
        return err;
    }
};

module.exports=invalid;