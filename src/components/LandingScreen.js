import React from 'react';
import {Navbar,Button,FormControl,FormGroup} from 'react-bootstrap';

export default class LandingScreen extends React.Component{

  render(){
    return(
      <div>
        <Navbar>
          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl style={{width:'175px'}} type='text' placeholder='Email'/>
              <FormControl style={{width:'175px'}} type='text' placeholder='Password'/>
            </FormGroup>
            <Button type='submit'>Submit</Button>
          </Navbar.Form>
        </Navbar>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
        <h1>GitVote</h1>
        <Button bsStyle='success' style={{marginTop:'3%'}}>Sign Up</Button>
      </div>
      </div>
    );
  }
}
