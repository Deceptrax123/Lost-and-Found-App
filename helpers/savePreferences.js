const Preference=require("../models/preferences");

const savePreference=async(message_id,date,mode,fromTime,toTime)=>{
    try{
        const preference=new Preference({
            message_id:message_id,
            deliveryDate:date,
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