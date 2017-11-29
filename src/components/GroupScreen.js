import React from 'react';
import {Navbar,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class GroupScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      teams:[]
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
    if(this.state.teams.length >0){
      for(var i =0;i<this.state.teams.length;i++){
        teamArray.push(<ListGroupItem key={i} href={'/teams/'+this.state.teams[i].name+'/proposals'}>{this.state.teams[i].name}</ListGroupItem>);
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
