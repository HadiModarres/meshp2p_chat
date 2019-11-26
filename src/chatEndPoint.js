const EventEmitter = require("events");

class ChatEndPoint extends EventEmitter{

    constructor() {
        super(null);
    }

    sendMessage(message){

    }

}

module.exports = ChatEndPoint;

