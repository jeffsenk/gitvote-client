import React from 'react';
import {Link} from 'react-router-dom';
import TeamIcon from 'react-icons/lib/fa/rocket';
import {Button} from 'react-bootstrap';

export default class TeamItem extends React.Component{
  constructor(props){
    super(props);
    this.state={
      highlight:'initial',
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  handleAccept(){
     this.props.accept(this.props.teamKey,this.props.userKey);
  }

  handleDecline(){
    this.props.decline(this.props.teamKey,this.props.userKey);
  }

  handleMouseEnter(){
    this.setState({highlight:'mintCream'});
  }

  handleMouseExit(){
    this.setState({highlight:'initial'});
  }

  render(){
    const main={
      borderStyle:'solid',
      borderWidth:'1px',
      borderColor:'lightgray',
      backgroundColor:this.state.highlight,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      height:'70px'
    }
    const title={
      marginLeft:'10px',
      paddingTop:'5px',
      height:'50%',
      fontSize:'large'
    }

    if(this.props.invitation){
      return(
      <div style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
	<TeamIcon style={{marginLeft:'2%',height:'30px',width:'30px'}}/>
	<div style={title}><Link to={{pathname:this.props.match.url+'/'+this.props.teamKey}}>
	{this.props.name}</Link>
	</div>
        <div style={{marginLeft:'50%',display:'flex',flexDirection:'row'}}>
          <div>
            <Button bsStyle='success' onClick={this.handleAccept}>Accept</Button>
          </div>
          <div style={{marginLeft:'5%'}}>
            <Button bsStyle='danger' onClick={this.handleDecline}>Decline</Button>
          </div>
        </div>
      </div>
      )
    }
    return(
      <div style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
	<TeamIcon style={{marginLeft:'2%',height:'30px',width:'30px'}}/>
	<div style={title}><Link to={{pathname:this.props.match.url+'/'+this.props.teamKey}}>
	{this.props.name}</Link>
	</div>
      </div>
    );
  }
}
