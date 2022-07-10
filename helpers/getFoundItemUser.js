const Item=require("../models/lost_items");
const User=require("../models/users");

const getFoundItemUser=async (id)=>{
    try{
        const item=await Item.findOne({_id:id});

        const owner_id=item._id;
        try{
            const owner=await User.findOne({_id:owner_id});

            return owner.username;
        }
        catch(err)
        {
            return 0;
        }
    }catch(err)
    {
        return 0;
    }
};

module.exports=getFoundItemUser;