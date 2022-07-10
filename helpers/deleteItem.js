const Item=require("../models/lost_items");


const deleteItem=async(id)=>{
    try{
        await Item.deleteOne({_id:id});
        return 1;
        
    }
    catch(err)
    {
        return 0;
    }
};

module.exports=deleteItem;