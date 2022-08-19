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

module.exports=getSender;