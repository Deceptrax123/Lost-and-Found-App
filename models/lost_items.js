const mongoose=require('mongoose');

const lostItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    img:{
        data:Buffer,
        content:String
    },          
    place:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const Item=mongoose.model("Item",lostItemSchema);

module.exports=Item;