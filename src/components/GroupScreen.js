import React from 'react';
import {Navbar,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import TeamItem from './TeamItem';

export default class GroupScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      teams:{}
    }
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  handleSignOut(){
    this.props.auth.signOut();
  }

  componentDidMount(){
    if(this.props.auth.currentUser){
      fetch('/userTeams',{
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
  }

  render(){
    if(!this.props.auth.currentUser){
      return(<Redirect to='/'/>);
    }
    let teamArray =[];
    if(this.state.teams!=null){
      for(var key in this.state.teams){
        teamArray.push(<TeamItem {...this.props} key={key} teamKey={key} name={this.state.teams[key].name}/>);
      }  
    }
    teamArray.push(<ListGroupItem key='new' href='/newteam'> + Create a New Team </ListGroupItem>);
    return(
      <div>
        <Navbar>
         <Navbar.Form pullRight>
           <Button onClick={this.handleSignOut}>Sign Out</Button>
         </Navbar.Form>
        </Navbar>
        <div style={{marginLeft:'25%',width:'50%'}}>
        <h1>Select A Team</h1>
        <ListGroup>
          {teamArray}
        </ListGroup>
        </div>
      </div>
    );
  }
}
