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
       return <div className="App">
           <div className={"row justify-content-center"}>
           <input placeholder={"Enter Your Name"} className={"col-sm-5 form-control"} onChange={this.nameFieldChanged} type="text"/>
           </div>

           <br/>
           <div className={"row justify-content-center"}>
           <button className={"btn btn-default btn-lg"} onClick={this.nameSubmitted}>Join</button>
           </div>
       </div>
   }
}

export default Profile;

