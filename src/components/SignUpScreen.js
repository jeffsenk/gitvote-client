import React from 'react';
import {Navbar,Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

export default class SignUpScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      email:'',
      password:'',
      signedUp:false
    }
    this.handleSignOn = this.handleSignOn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleChange(event){
    const key = event.target.name;
    const value = event.target.value;
    this.setState({[key]:value});
  }

  handleSignOn(){
    console.log(this.state.name,this.state.email,this.state.password)
  }

  handleSignUp(){
    if (this.props.auth.currentUser){
      this.props.auth.signOut();
    }else{
      this.props.auth.createUserWithEmailAndPassword(this.state.email,this.state.password).then(function(user){
        this.props.database.ref('Users/'+user.uid).set(true);
        this.props.database.ref('Users/'+user.uid+'/Name').set(this.state.name);
        this.props.database.ref('Users/'+user.uid+'/email').set(this.state.email);
        this.setState({signedUp:true});
      }.bind(this),function(error){
        alert(error.message);
      });
    }
  }

  render(){
    if(this.state.signedUp){
      return(<Redirect to='/'/>);
    }
    return(
      <div>
        <Navbar>
        </Navbar>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
        <form>
          <FormGroup>
            <ControlLabel>UserName</ControlLabel>
            <FormControl name='name' type='text' onChange={this.handleChange} placeholder='Select a User Name'/>
            <ControlLabel>Email</ControlLabel>
            <FormControl name='email' type='text' onChange={this.handleChange} placeholder='Enter Email Address'/>
            <ControlLabel>Password</ControlLabel>
            <FormControl name='password' type='password' onChange={this.handleChange} placeholder='Password'/>
          </FormGroup>
        </form>
        <Button onClick={this.handleSignUp} bsStyle='success' style={{marginTop:'3%'}}>Sign Up</Button>
      </div>
      </div>
    );
  }
}
