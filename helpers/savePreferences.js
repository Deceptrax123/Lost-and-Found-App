const Preference=require("../models/preferences");

const savePreference=async(date,mode,fromTime,toTime)=>{
    try{
        const preference=new Preference({
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