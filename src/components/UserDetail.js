import React from 'react';
import TeamIcon from 'react-icons/lib/fa/user';

export default class UserDetail extends React.Component{

  render(){
    return(
      <div style={{marginLeft:'10%'}}>
        <TeamIcon style={{height:'50px',width:'50px'}}/>
        <h1>{this.props.location.state.user.name}</h1>
        <div>{this.props.location.state.user.email}</div>
      </div>
    );
  }
}
