import React from 'react';
import {Panel} from 'react-bootstrap';
import OptionItem from './OptionItem';
import apiServer from '../apiServer';

export default class ProposalDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.fetchProposal = this.fetchProposal.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
    this.fetchVotes = this.fetchVotes.bind(this);
    this.state={
      proposal:null,
      userHasVoted:false
    }
  }

  calculateAge(timeStamp){
    let millis = Number(Date.now() - timeStamp);
    let day = Number(1000*60*60*24);
    return Number(millis/day)
  }

  calculateResult(options){
    var count = 0;
    var result = 'Undecided';
    for(var key in options){
      if(options[key] > count){
        count = options[key];
        result = key;
      }else if(options[key] === count){
        result = 'Undecided';
      }
    }
    return result;
  }

  componentDidMount(){
    this.fetchProposal();
  }

  fetchVotes(proposal){
    for(var vote in proposal.Votes){
      fetch(apiServer+'/votes/'+vote).then((res)=>res.json())
      .then((data)=>{
        if(data.user === this.props.userKey){
          this.setState({userHasVoted:true});
        }
      });
    }
  }

  fetchProposal(){
    if(this.props.location.state.proposalKey){
      fetch(apiServer+'/proposals/'+this.props.location.state.proposalKey).then((res)=>res.json())
      .then((data)=>{
	this.setState({proposal:data});
        this.fetchVotes(data);
      })
    }
  }

  handleVote(option){
    if(this.props.location.state.status === 'open'){
      if(!this.state.userHasVoted){
	fetch(apiServer+'/newVote',{
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	   },
	  body: JSON.stringify({
	    proposal:this.props.location.state.proposalKey,
	    user:this.props.userKey,
	    option:option,
	    timeStamp:Date.now()
	  })
	}).then(function(res){
	  if(!res.ok){
	    alert('Error Creating Team');
	  }else{
	     this.fetchProposal()
	  }
	}.bind(this));
      }else{
        alert('You have already voted on this proposal');
      }
    }else{
      alert('Proposal is closed for voting');
    }
  }

  render(){
    const main ={
      marginLeft:'10%',
      marginTop:'3%',
      width:'80%',
      height:'100%'
    }

    const borderColor=['tomato','limegreen','orange','royalblue'];
    const fillColor=['salmon','lightgreen','gold','skyblue'];

    let optionArray = [];
    let counter = 0;
    let age = 0;
    let submitter = '';
    let result = '';
    if(this.state.proposal != null){
      for(var key in this.state.proposal.Options){
	optionArray.push(<OptionItem key={key} count={this.state.proposal.Options[key]} handleVote={this.handleVote} name={key} color={borderColor[counter]} highlight={fillColor[counter]} title={key}/>);
        counter++;
        if(counter>3){
          counter=0;
        }
      }
      age = this.calculateAge(this.state.proposal.timeStamp).toFixed(0);
      submitter = this.state.proposal.userName;
      if(this.props.location.state.status === 'closed'){
        result = this.calculateResult(this.state.proposal.Options);
      }
    }
  
    return(
      <div style={main}>
        <div style={{display:'flex',flexDirection:'row'}}>
          <h1 style={{width:'62%'}}>{this.props.location.state.proposal.title}</h1>
	    {this.props.location.state.status === 'closed' &&
	      <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'300px',marginLeft:'auto',height:'40px',borderStyle:'solid',borderRadius:'7px',borderWidth:'2px'}}>
		<h4>{result}</h4>
	      </div>
	    }
        </div>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'70%'}}>
	    <Panel  header={'Submitted by '+submitter+' '+age+' days ago'}>
	      <div>{this.props.location.state.proposal.description}</div>
	    </Panel>
          </div>
          <div style={{marginLeft:'20px'}}>
            <ul>{optionArray}</ul>
          </div>
        </div>
      </div>
    );
  }
}
