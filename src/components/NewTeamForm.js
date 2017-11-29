import React from 'react';
import {Navbar,Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

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
    let newKey = this.props.database.ref('Teams').push({
      name:this.state.name
    },function(err){
      if(err){
       alert(err.message);
      };
    }).key;
    this.props.database.ref('Users/'+this.props.auth.currentUser.uid+'/Teams/'+newKey).set('true'); 
    this.setState({created:true});
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
