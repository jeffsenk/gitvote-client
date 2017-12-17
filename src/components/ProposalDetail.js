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
    this.state={
      proposal:null
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
      }
    }
    return result;
  }

  componentDidMount(){
    this.fetchProposal();
  }

  fetchProposal(){
    if(this.props.location.state.proposalKey){
      fetch(apiServer+'/proposals/'+this.props.location.state.proposalKey).then((res)=>res.json())
      .then((data)=>{
	this.setState({proposal:data});
      })
    }
  }

  handleVote(option){
    if(this.props.location.state.status === 'open'){
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
      alert('Proposal is closed for voting');
    }
  }

  render(){
    const main ={
      marginLeft:'15%',
      marginTop:'3%',
      width:'70%',
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
      age = this.calculateAge(this.state.proposal.timeStamp).toFixed(1);
      submitter = this.state.proposal.userName;
      if(this.props.location.state.status === 'closed'){
        result = this.calculateResult(this.state.proposal.Options);
      }
    }
  
    return(
      <div style={main}>
        <h1>{this.props.location.state.proposal.title}</h1>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'70%'}}>
          <Panel  header={'Submitted by '+submitter+' '+age+' days ago'}>
            <div>{this.props.location.state.proposal.description}</div>
          </Panel>
          {this.props.location.state.status === 'closed' &&
          <Panel>
            <h4>Result: {result}</h4>
          </Panel>
          }
          </div>
          <div style={{marginLeft:'40px'}}>
            <ul>{optionArray}</ul>
          </div>
        </div>
      </div>
    );
  }
}
