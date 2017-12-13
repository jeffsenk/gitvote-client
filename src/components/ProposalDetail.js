import React from 'react';
import {Panel} from 'react-bootstrap';
import OptionItem from './OptionItem';
export default class ProposalDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
    this.fetchProposal = this.fetchProposal.bind(this);
    this.state={
      proposal:null
    }
  }

  componentDidMount(){
    this.fetchProposal();
  }

  fetchProposal(){
    if(this.props.location.state.proposalKey){
      fetch('/proposals/'+this.props.location.state.proposalKey).then((res)=>res.json())
      .then((data)=>{
	this.setState({proposal:data});
      })
    }
  }

  handleVote(option){
    fetch('/newVote',{
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
    if(this.state.proposal != null){
      for(var key in this.state.proposal.Options){
	optionArray.push(<OptionItem key={key} count={this.state.proposal.Options[key]} handleVote={this.handleVote} name={key} color={borderColor[counter]} highlight={fillColor[counter]} title={key}/>);
        counter++;
        if(counter>3){
          counter=0;
        }
      }
    }
    return(
      <div style={main}>
        <h1>{this.props.location.state.proposal.title}</h1>
        <div style={{display:'flex',flexDirection:'row'}}>
          <Panel style={{width:'70%'}} header='Proposal'>
            <div>{this.props.location.state.proposal.description}</div>
          </Panel>
          <div style={{marginLeft:'40px'}}>
            <ul>{optionArray}</ul>
          </div>
        </div>
      </div>
    );
  }
}
