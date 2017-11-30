import React from 'react';

export default class TeamScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      team:null
    }
  }

  componentDidMount(){
    fetch('/teams/'+this.props.match.params.id).then((res)=>res.json())
    .then((data)=>{
      this.setState({team:data});
    }); 
  }

  render(){
    if(this.state.team != null){
      return(
	<div>
	  <h1 style={{marginLeft:'10%'}}>{this.state.team.name}</h1>
	</div>
      );
    }
    return(
      <div>
      </div>
    );
  }
}
