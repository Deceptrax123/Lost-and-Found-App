const socket=(io)=>{

    io.on('connection',(socket)=>{

        socket.join('joined-user',(data)=>{

            socket.join(data.roomname);

            io.to(data.roomname).emit('joined-user',{username:data.username})
        })

        socket.on('chat',(data)=>{
            io.to(data.roomname).emit('chat',{username:data.username,message:data.message});
        })
    });
}

module.exports=socket;