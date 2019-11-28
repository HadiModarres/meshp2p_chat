import React from 'react';
import logo from './logo.svg';
import Profile from "./profile/Profile";
import Search from "./search/Search";
import Chat from "./chat/Chat";
import {Launcher} from 'react-chat-window'
import './App.css';

let {Node} = require("meshp2p");

class App extends React.Component{
    constructor(){
        super(null);
        this.state = {node: null,state: "name", chatEndPoint: null, messageList: []};
        this.nameSubmitted = this.nameSubmitted.bind(this);
        this.connected = this.connected.bind(this);
        this.chatEnded = this.chatEnded.bind(this);

    }
    nameSubmitted(name){

        this.state.node = new Node(()=>{},{ANALYTICS: false});
        this.state.node.registerList("list#name", (a, b) => {
            return 1
        });
        this.state.node.setEntries("list#name", [name]);
        this.state.node.startNode();

        console.log("App: name submitted " + name);
        this.setState((prevState) => {
            return {state: "search"};
        });
    }

    connected(chatEndPoint){
        this.setState((prevState) => {
            return {state: "chat", chatEndPoint: chatEndPoint};
        });
    }

    chatEnded(){
        this.setState((prevState) => {
            return {state: "search"};
        });
    }

    // _onMessageWasSent(message) {
    //     this.setState({
    //         messageList: [...this.state.messageList, message]
    //     })
    // }
    //
    // _sendMessage(text) {
    //     if (text.length > 0) {
    //         this.setState({
    //             messageList: [...this.state.messageList, {
    //                 author: 'them',
    //                 type: 'text',
    //                 data: {text}
    //             }]
    //         })
    //     }
    // }


  render() {
        return <div>
            { this.state.state==="name" ? <Profile nameSubmitted={this.nameSubmitted}/> : null}
            { this.state.state==="search" ? <Search node={this.state.node} connected={this.connected}/> : null}
            { this.state.state==="chat" ? <Chat chatEnded={this.chatEnded} chatEndPoint={this.state.chatEndPoint}/> : null}
        </div>
 };

}

export default App;
