import React from 'react';
import {Navbar,ListGroup,ListGroupItem,Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class GroupScreen extends React.Component{
  constructor(props){
    super(props)
    this.createGroup = this.createGroup.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  createGroup(){
    alert('create new group')
  }

  handleSignOut(){
    this.props.auth.signOut();
  }

  componentDidMount(){
    console.log(this.props.auth.currentUser)
  }

  render(){
    if(!this.props.auth.currentUser){
      return(<Redirect to='/'/>);
    }
    return(
      <div>
        <Navbar>
         <Navbar.Form pullRight>
           <Button onClick={this.handleSignOut}>Sign Out</Button>
         </Navbar.Form>
        </Navbar>
        <div style={{marginLeft:'25%',width:'50%'}}>
        <h1>Select A Group</h1>
        <ListGroup>
          <ListGroupItem href='#'>Open Austin</ListGroupItem>
          <ListGroupItem href='#'>Crypto Collective</ListGroupItem>
          <ListGroupItem onClick={this.createGroup}> + Create a New Group </ListGroupItem>
        </ListGroup>
        </div>
      </div>
    );
  }
}
