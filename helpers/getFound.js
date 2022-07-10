const Item=require("../models/lost_items");


const getFoundItem=async (id)=>{
    try{
        const item=await Item.findOne({_id:id});

        return item;
    }catch(err)
    {
        return 0;
    }
};

module.exports=getFoundItem;