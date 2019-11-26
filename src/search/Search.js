import React from 'react';
let ChatEndPoint = require('../chatEndPoint');

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.searchFieldChanged = this.searchFieldChanged.bind(this);
        this.searchSubmitted = this.searchSubmitted.bind(this);
        this.connect = this.connect.bind(this);
        this.state = {searchQuery:"", searchResults:[]}

    }

    searchFieldChanged(ev){
        this.state = {searchQuery: ev.target.value}
    }
    searchSubmitted(){
        if (this.state.searchQuery === ""){
            window.alert("query can't be empty.")
        }else {
            this.setState((prevState) => {
                return {searchResults: [{name: "aaron"}]};
            });

        }
    }

    render() {
        return <div className="App">
            <div className={"row justify-content-center"}>
            <input onChange={this.searchFieldChanged} className={"col-sm-4 form-control"} type="text"/>
            <button className={"btn btn-primary btn-lg"} onClick={this.searchSubmitted}>Search</button>
            </div>
            <div>
            {this.state.searchResults.map((value,index) => {
                return (
                    <SearchResult connect={this.connect} pointer={null} key={index} name={value.name}/>
                );
            })}
            </div>
        </div>
    }

    connect(pointer){
        //todo meshp2p connect
        let endpoint = new ChatEndPoint();
        this.props.connected(endpoint);
    }
}

class SearchResult extends React.Component{
    constructor(props){
        super(props);
    }


    render() {
        return <div className="App">
            <div>{this.props.name}</div>
            <button className={"btn btn-info"} onClick={()=> {
                this.props.connect(this.props.pointer)
            }}>Connect</button>
        </div>;
    }
}

export default Search;
