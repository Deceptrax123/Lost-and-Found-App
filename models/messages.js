const mongoose=require("mongoose");

const messageSchema= new mongoose.Schema({

    sender:{
        type:String,
    },

    description:{
        type:String,
        required:true
    },

    img:{
        data:Buffer,
        content:String,
    },

    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;