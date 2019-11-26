import React from 'react';
import {Widget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

let ChatEndPoint = require("../chatEndPoint");



class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div className={"App"}>
            <Widget/>
            <Widget/>
            <Widget/>
        </div>
    }
}

export default Chat;
