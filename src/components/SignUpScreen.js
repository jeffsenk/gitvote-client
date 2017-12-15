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
	fetch('/newUser',{
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	   },
	  body: JSON.stringify({
	    userKey:user.uid,
            name:this.state.name,
            email:this.state.email
	  })
	}).then(function(res){
	  if(!res.ok){
	    alert('Error Creating User');
          }else{
             this.setState({signedUp:true});
          }
        }.bind(this));
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
      <div style={{height:'100%'}}>
        <Navbar>
	 <Navbar.Header>
	   <Navbar.Brand>
	     <a href='/'>GitVote</a>
	   </Navbar.Brand>
	 </Navbar.Header>
        </Navbar>
        <div style={{marginTop:'5%',height:'100%',display:'flex',justifyContent:'center'}}>
          <div style={{width:'40%',marginLeft:'5%'}}>
            <h1>Create a New Login</h1>
            <h2 style={{marginTop:'5%',color:'gray'}}>In the Next Step You Can Join a Team, or Start A New One</h2>
          </div>
          <div style={{borderRadius:'5%',marginLeft:'10%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flexstart',width:'30%',height:'60%',backgroundColor:'rebeccapurple'}}>
          <form style={{marginTop:'10%'}}>
          <FormGroup>
            <ControlLabel style={{color:'white'}}>UserName</ControlLabel>
            <FormControl name='name' type='text' onChange={this.handleChange} placeholder='Select a User Name'/>
            <ControlLabel style={{color:'white'}}>Email</ControlLabel>
            <FormControl name='email' type='text' onChange={this.handleChange} placeholder='Enter Email Address'/>
            <ControlLabel style={{color:'white'}}>Password</ControlLabel>
            <FormControl name='password' type='password' onChange={this.handleChange} placeholder='Password'/>
          </FormGroup>
          </form>
          <Button onClick={this.handleSignUp} bsStyle='success' style={{marginTop:'3%'}}>Sign Up</Button>
          </div>
        </div>
      </div>
    );
  }
}
