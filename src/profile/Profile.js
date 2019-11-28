import React from 'react';

class Profile extends React.Component{
   constructor(props){
       super(props);
       this.nameSubmitted = this.nameSubmitted.bind(this);
       this.nameFieldChanged = this.nameFieldChanged.bind(this);
       this.state = {name: ""}
   }

    nameSubmitted(ev){
        if (this.state.name === ""){
            window.alert("Name can't be empty.")
        }else {
            this.props.nameSubmitted(this.state.name);
        }
    }

    nameFieldChanged(ev){
        this.state = {name: ev.target.value}
    }

   render() {
       return <div className="App center">
           <div className={"container card-2"}>
               <h4>Demo P2P Chat</h4>
               <br/>
               <br/>
           <div className={"row justify-content-center"}>

           <input placeholder={"Name"} className={"col-sm-5 form-control"} onChange={this.nameFieldChanged} type="text"/>
           </div>

           <br/>
           <div className={"row justify-content-center"}>
           <button className={"btn btn-primary btn-lg"} onClick={this.nameSubmitted}>Join</button>
           </div>
           </div>
       </div>
   }
}

export default Profile;

