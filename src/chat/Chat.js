import React from 'react';
// import {setQuickButtons, Widget, addResponseMessage,toggleWidget} from 'react-chat-widget';
import {Launcher} from 'react-chat-window'
import 'react-chat-widget/lib/styles.css';




class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messageList: []};
        this.handleNewMessage = this.handleNewMessage.bind(this);
        this.quickButtonClicked = this.quickButtonClicked.bind(this);
        this.props.chatEndPoint.on("message", (message) => {
            // addResponseMessage(message);
            this.setState((prevState) => {
                return {messageList: [...prevState.messageList, message]};
            });
        });
        this.props.chatEndPoint.on("closed", () => {
            this.props.chatEnded();
        });

        // toggleWidget();
        // setQuickButtons([{label: "Close Chat", value: "value"}]);
    }

    handleNewMessage(newMessage){
        console.info(newMessage);
        this.props.chatEndPoint.sendMessage(newMessage);
        this.setState((prevState) => {
            return {messageList: [...prevState.messageList, newMessage]};
        });
    }

    quickButtonClicked(){
        console.info("quick button clkced: ");
        this.props.chatEndPoint.close();
        this.props.chatEnded();
    }

    render() {
        // return <div><Widget key={Math.random()} showCloseButton={false} fullScreenMode={false} handleQuickButtonClicked={this.quickButtonClicked} handleNewUserMessage={this.handleNewMessage}/>
        //     <Widget key={Math.random()} showCloseButton={false} fullScreenMode={false} handleQuickButtonClicked={this.quickButtonClicked} handleNewUserMessage={this.handleNewMessage}/>
        // </div>
        return <Launcher
            agentProfile={{
                teamName: 'react-chat-window',
                imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
            }}
            onMessageWasSent={this.handleNewMessage}
            messageList={this.state.messageList}
            showEmoji
            handleClick={this.quickButtonClicked}
            isOpen={true}
        />;

    }
}

export default Chat;
