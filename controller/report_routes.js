
const saveMessage=require("../helpers/message");
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

        const val=await saveMessage(req.params.id,req.body.description,img,req.user.username);

        if(val===1){
            res.send("message succcesfully sent");
        }else if(val===0){
            res.send("User not found")
        }
        else
        {
            console.log(err); //handle an error here.
        }
    }catch(err)
    {
        console.log(err); //handle error here.
    }
};

module.exports={fileReport,sendReport};