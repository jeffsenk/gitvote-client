import React from 'react';
import {Panel} from 'react-bootstrap';
import OptionItem from './OptionItem';
export default class ProposalDetail extends React.Component{
  constructor(props){
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  componentDidMount(){
  }

  handleVote(option){
    console.log(this.props.userKey,option)
  }

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
        <div style={{display:'flex',flexDirection:'row'}}>
          <Panel header='Proposal'>
            <div>{this.props.location.state.proposal.description}</div>
          </Panel>
          <div style={{marginLeft:'40px'}}>
            <OptionItem handleVote={this.handleVote} name='yes' color={'limegreen'} highlight={'lightgreen'}title={'Yes'}/>
            <OptionItem handleVote={this.handleVote} name='no' color={'tomato'} highlight={'salmon'} title={'No'}/>
          </div>
        </div>
      </div>
    );
  }
}
