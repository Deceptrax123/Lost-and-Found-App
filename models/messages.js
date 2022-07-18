const mongoose=require("mongoose");

const messageSchema= new mongoose.Schema({

    sender:{
        type:mongoose.Schema.Types.ObjectId,
    },

    description:{
        type:String,
        required:true
    },

    item_id:{
        type:mongoose.Schema.Types.ObjectId,
    },

    img:{
        data:Buffer,
        content:String,
    },

    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    
});

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;