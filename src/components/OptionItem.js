import React from 'react';

export default class OptionItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      highlight:'initial'
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleVote = this.handleVote.bind(this);
  }

  handleMouseEnter(){
    this.setState({highlight:this.props.highlight});
  }

  handleMouseExit(){
    this.setState({highlight:'initial'});
  }

  handleVote(){
    this.props.handleVote(this.props.name);
  }

  render(){
    const main={
      cursor:'pointer',
      fontSize:'large',
      backgroundColor:this.state.highlight,
      display:'flex',
      flexDirection:'row',
      borderStyle:'solid',
      borderColor:this.props.color,
      borderWidth:'2px',
      marginBottom:'10px',
      borderRadius:'7px',
      width:'300px',
      height:'40px'
    }

    return(
      <div onClick={this.handleVote} style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        <div style={{marginLeft:'2%',display:'flex',flexDirection:'row'}}>
          <div style={{width:'200px',display:'flex',alignItems:'center',justifyContent:'center'}}>{this.props.title}</div>
          <div style={{width:'98px',display:'flex',borderLeftStyle:'solid',borderLeftWidth:'2px',borderLeftColor:this.props.color,alignItems:'center',
          justifyContent:'center'}}>{this.props.count}</div>
        </div>
      </div>
    );
  }
}
