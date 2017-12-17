import React from 'react';
import {Navbar,Button,FormControl,FormGroup} from 'react-bootstrap';
import backgroundImage from '../brightBackground.png';

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
      <div style={{height:'100%',backgroundImage:'url('+ backgroundImage +')',backgroundSize:'cover',overflow:'hidden'}}>
        <Navbar>
           <Navbar.Header>
             <Navbar.Brand>
               <a href='/'>GitVote</a>
             </Navbar.Brand>
           </Navbar.Header>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl name='email' value={this.state.email} style={{width:'175px'}} type='text' onChange={this.handleChange} placeholder='Email'/>
              <FormControl name='password' style={{width:'175px'}} type='password' onChange={this.handleChange} placeholder='Password'/>
            </FormGroup>
            <Button type='submit' onClick={this.toggleSignIn}>Sign In</Button>
          </Navbar.Form>
        </Navbar>
        <div style={{width:'45%',marginTop:'6%',marginLeft:'53%'}}>
          <h1 style={{fontSize:'400%',color:'darkgray'}}>Create Consensus</h1>
          <h2 style={{color:'white'}}>Gitvote is the easy way for teams to make decisions and move forward</h2>
          <Button href='/signup' bsStyle='primary' style={{marginTop:'3%'}}>Get Started</Button>
        </div>
      </div>
    );
  }
}
