import React from 'react';
import {setQuickButtons, Widget, addResponseMessage,toggleWidget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';




class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.quickButtonClicked = this.quickButtonClicked.bind(this);
        this.props.chatEndPoint.on("message", (message) => {
            addResponseMessage(message);
        });

        toggleWidget();
        setQuickButtons([{label: "Close Chat", value: "value"}]);
    }

    handleNewMessage(newMessage){
        this.props.chatEndPoint.sendMessage(newMessage);
    }
    quickButtonClicked(){
        console.info("quick button clkced: ");
        this.props.chatEnded();

    }

    render() {
        return <Widget showCloseButton={false} fullScreenMode={true} handleQuickButtonClicked={this.quickButtonClicked} handleNewUserMessage={this.handleNewMessage}/>

    }
}

export default Chat;
