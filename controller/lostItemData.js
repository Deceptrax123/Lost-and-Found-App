const User=require("../models/users");
const Item=require("../models/lost_items");

//add lost item data to User db.
const addLostItem=async (user,name,cat,desc,place,date)=>{
    var flag;
    try{
        var item;
        try{
            item=new Item({
                name:name,
                category:cat,
                description:desc,
                place:place,
                date:date,
                owner:user,
            });

            await item.save();
        }catch(err)
        {
            flag=false;

            return flag;
        }
        
        await User.updateOne({username:user.username},{lostItem:item});

        flag=true;

        return flag;
    }catch(err)
    {
        flag=false;

        return flag;
    }
}

module.exports=addLostItem;