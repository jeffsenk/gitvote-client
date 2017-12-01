import React from 'react';
import {Link} from 'react-router-dom';
import TeamIcon from 'react-icons/lib/fa/rocket';

export default class TeamItem extends React.Component{
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
