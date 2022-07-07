const mongoose=require('mongoose');

const lostItemSchema=new mongoose.Schema({
    name:String,
    category:String,
    description:String
});

module.exports=lostItemSchema;