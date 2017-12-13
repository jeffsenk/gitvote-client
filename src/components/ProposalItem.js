import React from 'react';
import {Link} from 'react-router-dom';

export default class ProposalItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      highlight:'initial',
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.calculateAge = this.calculateAge.bind(this);
  }

  handleMouseEnter(){
    this.setState({highlight:'mintCream'});
  }

  handleMouseExit(){
    this.setState({highlight:'initial'});
  }

  calculateAge(timeStamp){
    let millis = Number(Date.now() - timeStamp);
    let day = Number(1000*60*60*24);
    return Number(millis/day)
  }

  render(){
    const main={
      borderStyle:'solid',
      borderWidth:'1px',
      borderColor:'lightgray',
      backgroundColor:this.state.highlight,
      display:'flex',
      flexDirection:'row',
      height:'70px'
    }
    const detail={
      display:'flex',
      flexDirection:'column',
      marginLeft:'2%',
      width:'70%'
    }
    const title={
      paddingTop:'5px',
      height:'50%',
      fontSize:'large'
    }
    const stats={
      paddingTop:'5px',
      color: 'gray'
    }
    const submit={
      color:'gray',
    }

    let age = this.calculateAge(this.props.proposal.timeStamp).toFixed(1);
    let voteCount = 0;
    let status = 'open';
    if(Number(age) > Number(this.props.proposal.deadline)){
      status = 'closed';
    }
    const statusStyle={
      color: status === 'open' ? 'limegreen' : 'tomato',
      marginLeft:'5%',
      paddingTop:'5px',
    }
    if(this.props.proposal.Votes){
      voteCount = Object.keys(this.props.proposal.Votes).length;
    }
    return(
      <div style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        <div style={detail}>
          <div style={title}><Link to={{pathname:this.props.match.url+'/proposals/'+this.props.id,
           state:{proposal:this.props.proposal,proposalKey:this.props.id,status:status}}}>{this.props.proposal.title}</Link></div>
          <div style={submit}>Submitted by {this.props.proposal.userName} {age} days ago</div>
        </div>
        <div style={stats}>{voteCount} Votes</div>
        <div style={statusStyle}>{status}</div>
      </div>
    );
  }
}
