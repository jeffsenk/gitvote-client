import React from 'react';
import {Navbar,Button,FormControl,FormGroup} from 'react-bootstrap';

export default class LandingScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:''
    }
    this.toggleSignIn = this.toggleSignIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    const key = event.target.name;
    const value = event.target.value;
    this.setState({[key]:value});
  }

  toggleSignIn(){
    if (this.props.auth.currentUser){
      this.props.auth.signOut();
    }else{
      var email = this.state.email;
      var password = this.state.password;
      this.props.auth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
    }
  }

  render(){
    return(
      <div>
        <Navbar>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl name='email' value={this.state.email} style={{width:'175px'}} type='text' onChange={this.handleChange} placeholder='Email'/>
              <FormControl name='password' style={{width:'175px'}} type='password' onChange={this.handleChange} placeholder='Password'/>
            </FormGroup>
            <Button type='submit' onClick={this.toggleSignIn}>Sign In</Button>
          </Navbar.Form>
        </Navbar>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
        <h1>GitVote</h1>
        <Button href='/signup' bsStyle='success' style={{marginTop:'3%'}}>Sign Up</Button>
      </div>
      </div>
    );
  }
}
