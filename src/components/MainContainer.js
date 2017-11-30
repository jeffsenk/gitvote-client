import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ProposalScreen from './ProposalScreen';
import MemberScreen from './MemberScreen';
import NewProposalForm from './NewProposalForm';
import ProposalDetail from './ProposalDetail';
import AdminScreen from './AdminScreen';
import TeamScreen from './TeamScreen';
import {Nav, NavItem,Navbar} from 'react-bootstrap';

export default class MainContainer extends React.Component{
  componentDidMount(){
    console.log('maincontainermount',this.props)
  }
  render(){
    const main={
      height:'100%'
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
          <NavItem href={this.props.match.url + '/members'}>Members</NavItem>
          <NavItem href={this.props.match.url + '/admin'}>Admin</NavItem>
        </Nav>
        </Navbar>
        <Switch>
          <Route exact path={this.props.match.url} component={TeamScreen}/>
          <Route exact path={this.props.match.url+'/proposals'}  render={(props)=>(<ProposalScreen {...this.props} />)}/>
          <Route exact path={this.props.match.url+'/members'} component={MemberScreen}/>
          <Route exact path={this.props.match.url+'/admin'} component={AdminScreen}/>
          <Route exact path={this.props.match.url+'/proposals/new'} component={NewProposalForm}/>
          <Route exact path={this.props.match.url+'/proposals/:id'} render={(props)=>(<ProposalDetail {...this.props}/>)}/>
        </Switch>
      </div>
    );
  }
}
