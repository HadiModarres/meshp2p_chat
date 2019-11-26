import React from 'react';
import logo from './logo.svg';
import Profile from "./profile/Profile";
import Search from "./search/Search";
import Chat from "./chat/Chat";
import './App.css';

class App extends React.Component{
    constructor(){
        super(null);
        this.state = {state: "name", chatEndPoint: null};
        this.nameSubmitted = this.nameSubmitted.bind(this);
        this.connected = this.connected.bind(this);
    }
    nameSubmitted(name){
        console.log("App: name submitted " + name);
        this.setState((prevState)=>{
            return {state: "search"};
        })
    }

    connected(chatEndPoint){
        this.setState((prevState)=>{
            return {state: "chat", chatEndPoint: {chatEndPoint}};
        })
    }


  render() {
        return <div>
            { this.state.state==="name" ? <Profile nameSubmitted={this.nameSubmitted}/> : null}
            { this.state.state==="search" ? <Search connected={this.connected}/> : null}
            { this.state.state==="chat" ? <Chat chatEndPoint={this.state.chatEndPoint}/> : null}
        </div>
 };

}

export default App;
