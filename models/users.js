const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const lostItemSchema=require("./lost_items");

const userSchema=new mongoose.Schema({
    username:String,
    password:String,

    lostItem:lostItemSchema,
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);



module.exports=User;

