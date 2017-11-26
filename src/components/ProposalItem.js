import React from 'react';
import {Link} from 'react-router-dom';

export default class ProposalItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      highlight:'initial'
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
  }

  handleMouseEnter(){
    this.setState({highlight:'mintCream'});
  }

  handleMouseExit(){
    this.setState({highlight:'initial'});
  }

  componentDidMount(){
console.log(this.props)
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
    const submit={
      color:'gray',
    }

    return(
      <div style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        <div style={detail}>
          <div style={title}><Link to={{pathname:'/main/proposals/'+this.props.id, state:{proposal:this.props.proposal}}}>{this.props.proposal.title}</Link></div>
          <div style={submit}>Submitted by john 5 days ago</div>
        </div>
        <div>Vote area</div>
      </div>
    );
  }
}
