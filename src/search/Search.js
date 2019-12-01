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

        this.state = {searching:false, requester: "", searchQuery: "", searchResults: []};
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
        // this.state = {searchQuery: ev.target.value}
        let query = ev.target.value;
        this.setState((prevState) => {
            return {searchQuery: query}
        });
    }

    searchSubmitted(){
        if (this.state.searchQuery === ""){
            window.alert("query can't be empty.")
        }else {
            this.setState((prevState) => {
                return {searching: true, searchResults: []};
            });
            this.props.node.search("list#name",this.state.searchQuery,60,(value)=>{
                if (value.value) {
                    this.setState((prevState) => {
                        return {searching: false, searchResults: [...prevState.searchResults,value]}
                    });
                }
            })
        }
    }

    acceptClicked(){
        this.state.channel.send(JSON.stringify({key: "ok",value: this.props.node.name}));
        let endpoint = new ChatEndPoint(this.state.channel,this.state.requester);
        this.props.connected(endpoint);
    }

    render() {
        return <div className="center App">
            <div className={"container"}>

            <div className={"input-group row justify-content-center"}>
            <input onChange={this.searchFieldChanged} placeholder={"Search Users"} className={"mt-auto mb-auto col-sm-5 form-control"} type="text"/>
            <span className={"input-group-btn"}>
            <button className={" ml-1 btn btn-primary"} onClick={this.searchSubmitted}>
                 Search</button>
            </span>
            </div>
            <br/>
            { this.state.pending ? <div className={"card-2"}><span>{this.state.requester} is trying to initiate a chat with you</span> <button className={"btn btn-success ml-4"} onClick={this.acceptClicked}>Accept</button></div> : null}
            <br/>
                {this.state.searching? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> : null}
                {this.state.searchResults.length>0?
                <div className={"row justify-content-center"}>
                    <table  className={"table table-hover"}>
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.searchResults.map((value,index) => {
                            return (
                                <SearchResult node={this.props.node} connect={this.connect} pointer={value.value} key={index} name={value.key}/>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                    :null}

            </div>
        </div>
    }

    connect(chatEndpoint){
        this.props.connected(chatEndpoint);
    }
}

class SearchResult extends React.Component{
    constructor(props){
        super(props);
        this.connect = this.connect.bind(this);
        this.state = {state: "default"};
    }

    connect(){
        this.props.node.connectToNode(this.props.pointer).then((rtcDataChannel)=>{
            console.info("connected");
            console.info(rtcDataChannel);
            rtcDataChannel.send(this.props.node.name);
            this.setState((prevState) => {
                return {state: "wait_accept"};
            });

            rtcDataChannel.onmessage=(msg)=>{
                let ms = JSON.parse(msg.data);
                if (ms.key === "ok") {
                    let endpoint = new ChatEndPoint(rtcDataChannel,ms.value);
                    this.props.connect(endpoint);
                }
            }
        });
    }

    render() {
        return <tr>
            <td>
                {this.props.name}
            </td>
            <td style={{"textAlign":"right"}}>
                <button  style={{"margin-left":"auto"}} className={"ml-5 btn btn-dark"} onClick={()=> {
                    this.connect()
                }}>{this.state.state === "wait_accept"? <span>Waiting for {this.props.name} to Accept</span> : <span>Start Chat</span>}</button>
            </td>
        </tr>
    }
}

export default Search;
