// //receive a request for connection
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connecton received', socket.id);

        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });
        
        socket.on('join_room', function(data){
            console.log('joining request received',data);

            //once the user joined we want the socket to be joined that particular room
            socket.join(data.chatroom);

            //once the user joined all should get a notification
            io.in(data.chatroom).emit('user_joined',data); //underscore cause event name should not be having the space in between
        });

        //CHANGE:: detect send message and broadcast to everyone in the room
        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });
    });

}