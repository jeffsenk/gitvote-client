import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ProposalScreen from './ProposalScreen';
import MemberScreen from './MemberScreen';
import NewProposalForm from './NewProposalForm';
import ProposalDetail from './ProposalDetail';
import AdminScreen from './AdminScreen';
import {Nav, NavItem,Navbar} from 'react-bootstrap';

export default class MainContainer extends React.Component{

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
          <NavItem href={this.props.match.url + '/proposals'}>Proposals</NavItem>
          <NavItem href={this.props.match.url + '/members'}>Members</NavItem>
          <NavItem href={this.props.match.url + '/admin'}>Admin</NavItem>
        </Nav>
        </Navbar>
        <Switch>
          <Redirect from={this.props.match.url} exact to={this.props.match.url+'/proposals'}/>
          <Route exact path={this.props.match.url+'/proposals'} render={props=>(<ProposalScreen {...props}/>)}/>
          <Route exact path={this.props.match.url+'/members'} component={MemberScreen}/>
          <Route exact path={this.props.match.url+'/admin'} component={AdminScreen}/>
          <Route exact path={this.props.match.url+'/proposals/new'} component={NewProposalForm}/>
          <Route exact path={this.props.match.url+'/proposals/:id'} component={ProposalDetail}/>
        </Switch>
      </div>
    );
  }
}
