const EventEmitter = require("events");

class ChatEndPoint extends EventEmitter{

    constructor(rtcChannel) {
        super(null);
        setTimeout(()=>{this.fakeMsg()}, 5000);
    }

    sendMessage(message){
        console.info("(endpoint) sending msg: "+message);
    }

    fakeMsg(){
        this.messageReceived(""+Math.random());
        setTimeout(()=>{this.fakeMsg()}, 5000);
    }

    messageReceived(message){
        this.emit("message", message);

    }



}

module.exports = ChatEndPoint;

