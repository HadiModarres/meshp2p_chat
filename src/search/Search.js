import React from 'react';
import Profile from "../profile/Profile";
let ChatEndPoint = require('../chatEndPoint');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchFieldChanged = this.searchFieldChanged.bind(this);
        this.searchSubmitted = this.searchSubmitted.bind(this);
        this.connect = this.connect.bind(this);
        this.acceptClicked = this.acceptClicked.bind(this);
        this.connectionReceived = this.connectionReceived.bind(this);

        this.state = {requester: "", searchQuery: "", searchResults: []};
        this.props.node.inboundCb = this.connectionReceived;

    }

    connectionReceived(rtcChannel){
        console.info("connection received");
        console.info(rtcChannel);
        rtcChannel.onmessage = (msg) => {
            console.info("initial msg received");
            console.info(msg.data);
            this.setState((prevState) => {
                return {requester: msg.data};
            });
        };


        this.setState((prevState) => {
            return {channel: rtcChannel, pending: true};
        });

    }
    searchFieldChanged(ev){
        this.state = {searchQuery: ev.target.value}
    }
    searchSubmitted(){
        if (this.state.searchQuery === ""){
            window.alert("query can't be empty.")
        }else {
            this.props.node.search("list#name",this.state.searchQuery,60,(value)=>{
                if (value.value) {
                    this.setState((prevState) => {
                        return {searchResults: [value]}
                    });

                }
            })
            // this.setState((prevState) => {
            //     return {searchResults: [{name: "aaron"}]};
            // });

        }
    }

    acceptClicked(){
        this.state.channel.send(JSON.stringify({key: "ok",value: this.props.node.name}));
        let endpoint = new ChatEndPoint(this.state.channel,this.state.requester);
        this.props.connected(endpoint);
    }

    render() {
        return <div className="App">
            <div className={"container"}>
            <div className={"row justify-content-center"}>
            <input onChange={this.searchFieldChanged} className={"col-sm-4 form-control"} type="text"/>
            <button className={"btn btn-primary btn-lg"} onClick={this.searchSubmitted}>Search</button>
            </div>
            <br/>
            { this.state.pending ? <div><span>{this.state.requester} is trying to open chat</span> <button onClick={this.acceptClicked}>Accept</button></div> : null}
            <br/>
            <div className={"card-2"}>
            {this.state.searchResults.map((value,index) => {
                return (
                    <SearchResult connect={this.connect} pointer={value.value} key={index} name={value.key}/>
                );
            })}
            </div>
            </div>
        </div>
    }

    connect(pointer){
        this.props.node.connectToNode(pointer).then((rtcDataChannel)=>{
            console.info("connected");
            console.info(rtcDataChannel);
            rtcDataChannel.send(this.props.node.name);
            rtcDataChannel.onmessage=(msg)=>{
                let ms = JSON.parse(msg.data);
                if (ms.key === "ok") {
                    let endpoint = new ChatEndPoint(rtcDataChannel,ms.value);
                    this.props.connected(endpoint);
                }
            }
        });
    }
}

class SearchResult extends React.Component{
    constructor(props){
        super(props);
    }


    render() {
        return <div className="row justify-content-center">
            <div className={"row"}>
                {this.props.name}
            <button style={{"margin-left":"auto"}} className={"btn btn-info"} onClick={()=> {
                this.props.connect(this.props.pointer)
            }}>Connect</button>
            </div>
        </div>;
    }
}

export default Search;
