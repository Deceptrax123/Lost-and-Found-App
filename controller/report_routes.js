
const saveMessage=require("../helpers/message");
const Item=require("../models/lost_items");
const fs=require('fs');
const path=require('path');

const fileReport=(req,res)=>{
    if(req.isAuthenticated()){
        res.send("This is the report found item page");
    }else{
        res.redirect("/users/login");
    }
};

const sendReport=async(req,res)=>{
    try{
        let img={
            data:fs.readFileSync(path.join("./public/uploads/"+req.file.filename)),
            content:"image/png"
        };

        const reciever=await Item.findById(req.params.id);
        const val=await saveMessage(reciever.owner,req.body.description,img,req.user.username,req.params.id);

        if(val===1){
            res.send("message succcessfully sent");
        }else if(val===0){
            res.send("User not found");
        }else{
            console.log(err); //handle an error here.
        }
    }catch(err){
        console.log(err); //handle error here.
    }
};

module.exports={fileReport,sendReport};