import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ProposalScreen from './ProposalScreen';
import NewProposalForm from './NewProposalForm';
import ProposalDetail from './ProposalDetail';
import AdminScreen from './AdminScreen';
import TeamScreen from './TeamScreen';
import {Nav, NavItem,Navbar,Button} from 'react-bootstrap';

export default class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state={
      user:'',
      signedOut:false
    }
  }

  handleSignOut(){
    this.props.auth.signOut();
    this.setState({signedOut:true});
  }

  componentDidMount(){
    this.props.auth.onAuthStateChanged(function(currentUser){
      if(currentUser){
        fetch('/users/'+this.props.auth.currentUser.uid).then((res)=>res.json()).then((data)=>{
          this.setState({user:data});
        });
      }
    }.bind(this));
  }

  render(){
    const main={
      height:'100%'
    }

    if(this.state.signedOut){
      return(<Redirect to='/'/>);
    }

    return(
      <div style={main}>
        <Navbar>
           <Navbar.Header>
             <Navbar.Brand>
               <a href='/'>GitVote</a>
             </Navbar.Brand>
           </Navbar.Header>
	  <Nav bsStyle='tabs'>
	    <NavItem href={this.props.match.url}>Team</NavItem>
	    <NavItem href={this.props.match.url + '/proposals'}>Proposals</NavItem>
	    <NavItem href={this.props.match.url + '/admin'}>Admin</NavItem>
	  </Nav>
           <Navbar.Form pullRight>
             <Button style={{marginLeft:'10px'}} onClick={this.handleSignOut}>Sign Out</Button>
           </Navbar.Form>
           <Navbar.Text pullRight>Signed in As {this.state.user.name}</Navbar.Text>
        </Navbar>
        <Switch>
          <Route exact path={this.props.match.url} render={(props)=>(<TeamScreen {...this.props}/>)}/>
          <Route exact path={this.props.match.url+'/proposals'}  render={(props)=>(<ProposalScreen {...this.props} />)}/>
          <Route exact path={this.props.match.url+'/admin'} component={AdminScreen}/>
          <Route exact path={this.props.match.url+'/proposals/new'} render={(props)=>(<NewProposalForm {...this.props}/>)}/>
          <Route exact path={this.props.match.url+'/proposals/:id'} render={(props)=>(<ProposalDetail {...this.props}/>)}/>
        </Switch>
      </div>
    );
  }
}
