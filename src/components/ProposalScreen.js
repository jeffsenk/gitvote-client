import React from 'react';
import {Button} from 'react-bootstrap';
import {Panel,ListGroup} from 'react-bootstrap';
import ProposalItem from './ProposalItem';

export default class ProposalScreen extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      proposals:null
    }
  }

  componentDidMount(){
    if(this.props.match.params.id){
    fetch('/proposals',{
        method:'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamKey: this.props.match.params.id
        })
    })
    .then((res)=>res.json())
    .then((proposals)=>{
      this.setState({proposals:proposals});
    })
    .catch((err)=>{
      console.log(err);
    });
    }
  }

  render(){
    const main ={
      marginLeft:'15%',
      marginTop:'3%',
      width:'70%',
      height:'100%'
    }

    if(this.state.proposals != null){
      let proposalArray = [];
      for(var key in this.state.proposals){ 
       proposalArray.push(<ProposalItem {...this.props} key={key} id={key} proposal={this.state.proposals[key]}/>);
      };
      return(
	<div style={main}>
	  <div style={{marginBottom:'1%',float:'right'}}>
	    <Button href={this.props.match.url +'/proposals/new'} bsStyle='success'>New Proposal</Button>
	  </div>
	  <Panel style={{clear:'both'}} header='Proposals'>
	    <ListGroup fill componentClass='ul'>
	      {proposalArray}
	    </ListGroup>
	  </Panel>
	</div>
      );
    }
    return(
      <div style={main}>
        <div style={{marginBottom:'1%',float:'right'}}>
          <Button href={this.props.match.url + '/proposals/new'} bsStyle='success'>New Proposal</Button>
        </div>
        <Panel style={{clear:'both'}} header='heading'>
          <ListGroup fill>
            <div style={{height:'100px',color:'lightGray',textAlign:'center',verticalAlign:'middle',lineHeight:'100px'}}>
              There are no proposals yet
            </div>
          </ListGroup>
        </Panel>
      </div>
    );



  }
}
