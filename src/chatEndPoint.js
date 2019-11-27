const EventEmitter = require("events");

class ChatEndPoint extends EventEmitter{

    constructor(rtcChannel) {
        super(null);
        // setTimeout(()=>{this.fakeMsg()}, 5000);
        this.channel = rtcChannel;
        this.channel.onmessage = (msg)=>{
            this.messageReceived(msg.data);
        }
    }

    sendMessage(message){
        // console.info("(endpoint) sending msg: "+message);
        this.channel.send(message);
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

