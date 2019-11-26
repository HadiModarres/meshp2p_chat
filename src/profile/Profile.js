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
           <div>Name: </div>
           <input onChange={this.nameFieldChanged} type="text"/>
           <button onClick={this.nameSubmitted}>Join</button>
       </div>
   }
}

export default Profile;

