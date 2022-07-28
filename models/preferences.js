const mongoose=require('mongoose');

const preferenceSchema=new mongoose.Schema({
    item_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    
    deliveryDate:{
        type:String,
        required:true
    },
    
    mode:{
        required:true,
        type:String
    },

    fromTime:{
        required:true,
        type:String,
    },

    toTime:{
        required:true,
        type:String
    }
});

const Preference=mongoose.model("Preference",preferenceSchema)

module.exports=Preference;

