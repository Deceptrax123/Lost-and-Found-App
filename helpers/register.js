
//email validation
const validateEmail=(email)=>
{
    const regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

//Email uniqueness.
const emailUniqueCheck=async (email,User)=>{
    try{
        const user=await User.findOne({email:email});

        if(user)
        {
            return 0;
        }
        else
        {
            return 1;
        }
    }catch(err)
    {
        return err;
    }
};

module.exports={validateEmail,emailUniqueCheck};