import React from 'react';
import {Navbar,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import TeamItem from './TeamItem';
import apiServer from '../apiServer'

export default class GroupScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      teams:{},
      invitations:{}
    }
    this.handleSignOut = this.handleSignOut.bind(this);
    this.fetchInvitations = this.fetchInvitations.bind(this);
    this.acceptInvitation = this.acceptInvitation.bind(this);
    this.declineInvitation = this.declineInvitation.bind(this);
  }
  handleSignOut(){
    this.props.auth.signOut();
  }

  acceptInvitation(teamKey,userKey){
    fetch(apiServer+'/acceptInvitation',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        userKey:userKey,
        teamKey:teamKey
      })
    }).then(function(res){
      if(!res.ok){
        alert('Error accepting');
      }else{
        this.fetchTeams();
        this.fetchInvitations();
      }
    }.bind(this));
  }

  declineInvitation(teamKey,userKey){
    fetch(apiServer+'/declineInvitation',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        userKey:userKey,
        teamKey:teamKey
      })
    }).then(function(res){
      if(!res.ok){
        alert('Error declining');
      }else{
        this.fetchTeams();
        this.fetchInvitations();
      }
    }.bind(this));
  }

  fetchInvitations(){
    fetch(apiServer+'/userInvitations',{
      method:'POST',
      headers:{
	'Accept': 'application/json',
	'Content-Type': 'application/json',
      },
      body: JSON.stringify({
	userKey: this.props.auth.currentUser.uid
      })
    }).then((res)=>res.json()).then((invitations)=>{
      this.setState({invitations:invitations});
    })
  }
  fetchTeams(){
      fetch(apiServer+'/userTeams',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userKey: this.props.auth.currentUser.uid
        })
      }).then((res)=>res.json()).then((teams)=>{
        this.setState({teams:teams});
      })
  }

  componentDidMount(){
    if(this.props.auth.currentUser){
      this.fetchTeams();
      this.fetchInvitations(); 
    }
  }

  render(){
    if(!this.props.auth.currentUser){
      return(<Redirect to='/'/>);
    }
    let teamArray =[];
    if(this.state.teams!=null){
      for(var key in this.state.teams){
        teamArray.push(<TeamItem {...this.props} key={key} invitation={false} userKey={this.props.auth.currentUser.uid} teamKey={key} name={this.state.teams[key].name}/>);
      }  
    }
    teamArray.push(<ListGroupItem key='new' href='/newteam'> + Create a New Team </ListGroupItem>);
    let invitationArray =[];
    if(this.state.invitations!=null){
      for(key in this.state.invitations){
        invitationArray.push(<TeamItem {...this.props} accept={this.acceptInvitation} decline={this.declineInvitation} key={key} invitation={true} userKey={this.props.auth.currentUser.uid} teamKey={key} name={this.state.invitations[key].name}/>);
      }
    }
    return(
      <div>
        <Navbar>
         <Navbar.Form pullRight>
           <Button onClick={this.handleSignOut}>Sign Out</Button>
         </Navbar.Form>
        </Navbar>
        <div style={{marginLeft:'25%',width:'50%'}}>
        <h1 style={{color:'dimgray'}}>Select Your Team</h1>
        <ListGroup>
          {teamArray}
        </ListGroup>
        <h1 style={{color:'dimgray'}}>Invitations</h1>
        <ListGroup>
          {invitationArray}
        </ListGroup>
        </div>
      </div>
    );
  }
}
