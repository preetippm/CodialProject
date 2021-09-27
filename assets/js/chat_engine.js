//this class is going to send a request for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail= userEmail;

        this.socket = io.connect('http://localhost:5000',{transports : ['websocket']});

        if(this.userEmail){
            this.connectionHandler();
        }
    }
    //this connection handler will have the to and fro interaction between the observer and the subscriber that is the user
    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
            // ask user to join the room -- when this event is emitted it will be received on chat sockets
            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined!',data);
            });
        });

        //CHANGE:: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received',data.message);

            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.append($('<sub>',{
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
            });
    }   
}
