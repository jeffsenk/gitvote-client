import React from 'react';
import {ListGroup} from 'react-bootstrap';
import UserItem from './UserItem';
import TeamIcon from 'react-icons/lib/fa/rocket';

export default class TeamScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      team:null,
      members:null
    }
  }

  componentDidMount(){
    fetch('/teams/'+this.props.match.params.id).then((res)=>res.json())
    .then((data)=>{
      this.setState({team:data});
    });
    fetch('/teamMembers/'+this.props.match.params.id).then((res)=>res.json())
    .then((data)=>{
      this.setState({members:data});
    });
  }

  render(){
    const memberList={
      width:'30%'
    }

    if(this.state.team != null){
      let memberArray = [];
      if(this.state.members!=null){
        for(var key in this.state.members){
          memberArray.push(<UserItem {...this.props} key={key} id={key} user={this.state.members[key]}/>);
        }
      } 
      return(
	<div style={{marginLeft:'10%'}}>
          <TeamIcon style={{width:'50px',height:'50px'}}/>
	  <h1>{this.state.team.name}</h1>
          <div style={memberList}>
	    <ListGroup>
	      {memberArray}
	    </ListGroup>
          </div>
	</div>
      );
    }
    return(
      <div>
      </div>
    );
  }
}
