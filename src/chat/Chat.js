import React from 'react';
import {Widget, addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';




class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.props.chatEndPoint.on("message",(message)=>{
            addResponseMessage(message);
        })
    }

    handleNewMessage(newMessage){
        this.props.chatEndPoint.sendMessage(newMessage);
    }

    render() {
        return <div className={"App"}>
            <Widget handleNewUserMessage={this.handleNewMessage}/>
        </div>
    }
}

export default Chat;
