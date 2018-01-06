import React from 'react';
import {Navbar,Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import apiServer from '../apiServer';

export default class NewTeamForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      created:false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(event){
    const key = event.target.name;
    const value = event.target.value;
    this.setState({[key]:value});
  }
  handleCreate(){
    if(this.state.name != ''){
      fetch(apiServer+'/newTeam',{
	method: 'POST',
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	 },
	body: JSON.stringify({
	  name:this.state.name,
	  userKey:this.props.auth.currentUser.uid
	})
      }).then(function(res){
	if(!res.ok){
	  alert('Error Creating Team');
	}else{
	   this.setState({created:true});
	}
      }.bind(this));
    }else{
      alert('Team name must not be blank');
    }
  }

  render(){
    if(this.state.created){
      return(<Redirect to='/teams'/>);
    }
    return(
      <div>
        <Navbar>
        </Navbar>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',marginTop:'10%'}}>
        <form>
          <FormGroup>
            <ControlLabel>Team Name</ControlLabel>
            <FormControl name='name' type='text' onChange={this.handleChange} placeholder='Select a Team Name'/>
          </FormGroup>
        </form>
        <Button onClick={this.handleCreate} bsStyle='success' style={{marginTop:'3%'}}>Create Team</Button>
      </div>
      </div>
    );
  }
}
