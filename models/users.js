const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const lostItemSchema=require("./lost_items");
const register=require("../controller/register");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[register,"Enter a valid email address"],
        },
    password:{
        type:String,
    },
    dob:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    lostItem:lostItemSchema,
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);



module.exports=User;

