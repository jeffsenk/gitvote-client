import React from 'react';
import {Link} from 'react-router-dom';
import UserIcon from 'react-icons/lib/fa/user';

export default class UserItem extends React.Component{
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
        <div style={{marginLeft:'2%',display:'flex',flexDirection:'row'}}>
          <UserIcon style={{width:'30px',height:'30px'}}/>
          <div style={title}><Link to={{pathname:this.props.match.url+'/'+this.props.id,state:{user:this.props.user}}}>
          {this.props.user.name}</Link>
          </div>
        </div>
      </div>
    );
  }
}
