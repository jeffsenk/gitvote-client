import React from 'react';
import {Panel} from 'react-bootstrap';

export default class ProposalDetail extends React.Component{

  render(){
    const main ={
      marginLeft:'15%',
      marginTop:'3%',
      width:'70%',
      height:'100%'
    }
    return(
      <div style={main}>
        <h1>{this.props.location.state.proposal.title}</h1>
        <Panel header='header'>
         <div>{this.props.location.state.proposal.description}</div>
        </Panel>
      </div>
    );
  }
}
