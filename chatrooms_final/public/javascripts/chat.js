var Chat = function(socket){
	this.socket = socket;
};
// add the following function to send chat messages:
Chat.prototype.sendMessage = function(room, text) {
	var message = {
	 room : room,
	 text : text
	};
	this.socket.emit('message', message);
};
// the following function is to change rooms:
Chat.prototype.changeRoom = function(room) {
	this.socket.emit('join', {
		newRoom: room
	});
};
//finaly add the functin to defined for processing a chat command. 
//two chat commands are recognized: join for join and nick for changin nickname
Chat.prototype.processCommand = function(command) {
	var words = command.split(' ');
	var command = words[0]
			.substring(1, words[0].length)
			.toLowerCase();
	var message = false;

	switch(command) {
	 case 'join' :
		 words.shift();
		 var room = words.join(' ');
		 this.changeRoom(room);
		 break;
	 case 'nick' :
		 words.shift();
		 var name = words.join(' ');
		 this.socket.emit('nameAttempt', name);
		 break;

	 default:
		 message = 'Unrecognized command.' ;
		 break;
	}
	return message;
};
