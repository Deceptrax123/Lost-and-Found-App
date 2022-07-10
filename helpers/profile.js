const Item=require("../models/lost_items");

const getProfile=async(user)=>{
    try{
        const item=await Item.find({owner:user._id});

        return item;
    }catch(err)
    {
        return 0;
    }
};

module.exports=getProfile;