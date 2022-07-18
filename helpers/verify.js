const Item=require("../models/lost_items");

const verify=async(id)=>{
    try{
        await Item.findByIdAndUpdate(id,{status:"Ongoing"});
        
        return 1;
    }catch(err){
        return err;
    }
};

module.exports=verify;