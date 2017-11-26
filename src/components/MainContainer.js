import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import ProposalScreen from './ProposalScreen';
import MemberScreen from './MemberScreen';
import NewProposalForm from './NewProposalForm';
import ProposalDetail from './ProposalDetail';
import {Nav, NavItem} from 'react-bootstrap';

export default class MainContainer extends React.Component{

  render(){
    const main={
      height:'100%'
    }

    return(
      <div style={main}>
        <Nav bsStyle='tabs'>
          <NavItem href={this.props.match.url + '/proposals'}>Proposals</NavItem>
          <NavItem href={this.props.match.url + '/members'}>Members</NavItem>
        </Nav>
        <Switch>
          <Redirect from={this.props.match.url} exact to={this.props.match.url+'/proposals'}/>
          <Route exact path={this.props.match.url+'/proposals'} component={ProposalScreen}/>
          <Route exact path={this.props.match.url+'/members'} component={MemberScreen}/>
          <Route exact path={this.props.match.url+'/proposals/new'} component={NewProposalForm}/>
          <Route exact path={this.props.match.url+'/proposals/:id'} component={ProposalDetail}/>
        </Switch>
      </div>
    );
  }
}
