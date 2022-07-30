const Item=require("../models/lost_items");

const getSessionItems=async(messages)=>{
    try{
        const items=[];
        for(let i=0;i<messages.length;i++){
            try{
                const item=await Item.findById(messages[i].item_id);
                items.push(item.name);
            }catch(err)
            {
                return err;
            }
        }
        return items;
    }catch(err)
    {
        return err;
    }
};

module.exports=getSessionItems;