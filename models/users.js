const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Item=require("./lost_items");
const {validateEmail}=require("../helpers/register");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validateEmail,"Enter a valid email address"],
        },
    password:{
        type:String,
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    lostItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Item",
    }],

    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }]
})

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);



module.exports=User;

