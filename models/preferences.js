const mongoose=require('mongoose');

const preferenceSchema=new mongoose.Schema({
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

