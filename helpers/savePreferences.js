const Preference=require("../models/preferences");

const savePreference=async(item_id,date,mode,fromTime,toTime)=>{
    try{
        const preference=new Preference({
            item_id:item_id,
            date:date,
            mode:mode,
            fromTime:fromTime,
            toTime:toTime,
        });

        await preference.save();

        return 1;
    }catch(err)
    {
        return err;
    }
};

module.exports=savePreference;