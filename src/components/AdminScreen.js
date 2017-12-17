import React from 'react';
import {Button} from 'react-bootstrap';
import apiServer from '../apiServer';

export default class AdminScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    const label = event.target.name;
    const value = event.target.value;
    this.setState({
      [label]:value
    });
  }

  handleSubmit(){
    console.log(this.props.match.params.id,this.state.email)
    fetch(apiServer+'/addMember',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
      body: JSON.stringify({
        teamKey:this.props.match.params.id,
        email:this.state.email
      })
    }).then(function(res){
      if(!res.ok){
        alert('Error Adding Member');
      }else{
         alert('User ' + this.state.email + ' invited to join group')
         this.setState({email:''});
      }
    }.bind(this));
  }


  render(){
    const form={
      marginLeft:'15%',
      marginTop:'5%',
      height:'50%',
      width:'70%'
    } 

    return(
      <div>
        <div style={form}>
          <h3>Invite a new Member</h3>
          <input name='email' type='text' placeholder='enter email address' value={this.state.email} onChange={this.handleChange} />
          <div style={{marginTop:'10px'}}>
            <Button bsStyle='success' onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}
