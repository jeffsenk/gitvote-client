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
      borderWidth:'3px',
      marginBottom:'10px',
      borderRadius:'7px',
      width:'200px',
      height:'40px'
    }

    return(
      <div onClick={this.handleVote} style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        <div style={{marginLeft:'2%',display:'flex',flexDirection:'row'}}>
          <div style={{width:'120px',display:'flex',alignItems:'center',justifyContent:'center'}}>{this.props.title}</div>
          <div style={{width:'75px',display:'flex',borderLeftStyle:'solid',borderLeftWidth:'3px',borderLeftColor:this.props.color,alignItems:'center',
          justifyContent:'center'}}>40</div>
        </div>
      </div>
    );
  }
}
