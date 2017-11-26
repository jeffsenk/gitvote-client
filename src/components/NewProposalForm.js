import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import {Button} from 'react-bootstrap';

export default class NewProposalForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:"",
      description:"",
      criteria:"Majority",
      quorumType:"Count",
      quorum:1,
      deadline:1,
      tags:[],
      suggestions:[]
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleDelete (i) {
    const tags = this.state.tags.slice(0)
    tags.splice(i, 1)
    this.setState({ tags })
  }
 
  handleAddition (tag) {
    const tags = [].concat(this.state.tags, tag)
    this.setState({ tags })
  }

  handleChange(event){
    const label = event.target.name;
    const value = event.target.value;
    this.setState({
      [label]:value
    });
  }

  handleSubmit(){
    if(this.state.title.length>0 && this.state.description.length>0){
      fetch('/newWebProposal',{
	method: 'POST',
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	 },
	body: JSON.stringify({
	  title: this.state.title,
	  description: this.state.description,
	  criteria:this.state.criteria,
	  quorum:this.state.quorum,
	  quorumType:this.state.quorumType,
	  deadline:this.state.deadline,
	  invitees:this.state.tags,
	  timeStamp:Date.now()
	})
      }).then(function(res){
        if(!res.ok){
          alert('Error Submitting Proposal');
        }else{
          alert('New Proposal Submitted');
        }
      });
    }else{
      alert('Please complete Title and Description Fields');
    }
  }

  render(){

    const form={
      marginLeft:'15%',
      marginTop:'5%',
      height:'50%',
      width:'70%'
    }

    const title={
      margin:'1%',
      width:'97%'
    }
    const titleInput={
      fontFamily:'sans-serif',
      fontSize:'large',
      width:'100%'
    }
    const descrip={
      margin:'1%',
      marginBottom:'5%',
      height:'60%',
      width:'97%'
    }
    const descripInput={
      fontFamily:'sans-serif',
      width:'100%',
      height:'100%'
    }
    const submit={
      margin:'1%',
      float:'right'
    }
    const content={
      borderRadius:'7px',
      borderColor:'lightgray',
      borderStyle:'solid',
      borderWidth:'1px',
      height:'100%',
      width:'65%',
      display:'inline-block'
    }
    const params={
      float:'right',
      width:'30%',
      height:'100%',
      display:'inline-block',
    }
    const invitees={
      color:'dimgray',
      padding:'1%',
      height:'40%',
      width:'100%',
    }
    const param={
      color:'dimgray',
      padding:'1%',
      height:'20%',
      width:'100%',
    }
    return(
      <div style={form}>
        <div style={content}>
	  <div style={title}>
	    <input placeholder='Title' style={titleInput} type="text" name="title" value={this.state.title} onChange={this.handleChange} />
	  </div>
	  <div style={descrip}>
	    <textarea placeholder='Description' style={descripInput} type="text" name="description"
	     value={this.state.description} onChange={this.handleChange} />
	  </div>
          <div style={submit}>
            <Button bsStyle='success' onClick={this.handleSubmit}>Submit</Button>
          </div>
        </div>
        <div style={params}>
          <div style={param}>
            <div>Minimum Participants</div>
            <input style={{display:'inline-block',width:'50px',marginRight:'1%'}} placeholder='1' type="number" name="quorum" value={this.state.quorum}
            onChange={this.handleChange}/>
            <select style={{display:'inline-block',marginTop:'2%'}} name="quorumType" value={this.state.quorumType} onChange={this.handleChange}>
              <option value="Count">Count</option>
              <option value="Percent">Percent</option>
            </select>
          </div>
          <div style={param}>
            <div>Passage Criteria</div>
            <select style={{marginTop:'2%'}} name="criteria" value={this.state.criteria} onChange={this.handleChange}>
              <option value="Majority">Majority</option>
              <option value="Plurality">Plurality</option>
            </select>
          </div>
          <div style={param}>
            <div>Deadline</div>
            <input style={{display:'inline-block',width:'50px',marginRight:'1%'}} placeholder='1' type="number" name="deadline"
             value={this.state.deadline} onChange={this.handleChange}/>
            <div style={{display:'inline-block'}}>Days</div>
          </div>
          <div style={invitees}>
            <div>Invitees</div>
            <ReactTags tags={this.state.tags} suggestions={this.state.suggestions} handleDelete={this.handleDelete}
	      placeholder='Select Users' handleAddition={this.handleAddition} allowNew={true}
              autofocus={false} autoresize={false} />
          </div>
        </div>
      </div>
    );
  }
}
