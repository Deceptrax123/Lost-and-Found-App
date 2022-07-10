

const chat=(req,res)=>{
    if(req.isAuthenticated())
    {
        const username=req.user.username;
        const roomname=req.params.id;

        res.send("Chat session");
    }else
    {
        res.redirect("/users/login");
    }

};

module.exports=chat;