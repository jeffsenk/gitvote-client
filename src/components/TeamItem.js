import React from 'react';
import {Link} from 'react-router-dom';

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
  componentDidMount(){
    console.log(this.props.teamKey,this.props.name)
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

    return(
      <div style={main} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseExit}>
        <div style={detail}>
          <div style={title}><Link to={{pathname:this.props.match.url+'/'+this.props.teamKey}}>
          {this.props.name}</Link>
          </div>
        </div>
      </div>
    );
  }
}
