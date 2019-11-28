const EventEmitter = require("events");

class ChatEndPoint extends EventEmitter{

    constructor(rtcChannel) {
        super(null);
        // setTimeout(()=>{this.fakeMsg()}, 5000);
        this.channel = rtcChannel;
        this.channel.onmessage = (msg) => {
            console.info("message received chatendpoint");
            console.info(msg);
            msg = JSON.parse(msg.data);
            msg.author = "them";
            console.info(msg);
            this.messageReceived(msg);
        };

        this.channel.onclose = ()=>{
            this.emit("closed");
        }
    }

    sendMessage(message){
        // console.info("(endpoint) sending msg: "+message);
        this.channel.send(JSON.stringify(message));
    }

    fakeMsg(){
        this.messageReceived(""+Math.random());
        setTimeout(()=>{this.fakeMsg()}, 5000);
    }

    messageReceived(message){
        this.emit("message", message);

    }
    close(){
        this.channel.close();
    }



}

module.exports = ChatEndPoint;

