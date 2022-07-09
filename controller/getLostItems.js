const Item=require("../models/lost_items");


const getItems=async ()=>{
    try{
        const items=await Item.find({});

        return items;
    }catch(err)
    {
        return 0;
    }
}

module.exports=getItems;