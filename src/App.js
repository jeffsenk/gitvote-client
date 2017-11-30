import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import LandingScreen from './components/LandingScreen';
import MainContainer from './components/MainContainer';
import SignUpScreen from './components/SignUpScreen';
import GroupScreen from './components/GroupScreen';
import NewTeamForm from './components/NewTeamForm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import firebase from './fire';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      authUser:{}
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(function(currentUser){
      if(currentUser){
        this.setState({
          authUser: currentUser
        });
      }else{
        this.setState({
          authUser: {},
        });
      }
    }.bind(this));
  }

  render() {
    const main={
      height:'100%'
    }
    return (
      <div style={main}>
        <Route exact path='/' render={props=>( firebase.auth().currentUser ? (
          <Redirect to='/teams'/>
        ):(
          <LandingScreen auth={firebase.auth()} database={firebase.database()}/>
        ))}/>
        <Route exact path='/signup' render={props=>(<SignUpScreen auth={firebase.auth()} database={firebase.database()}/>)}/>
        <Route exact path='/teams' render={props=>(<GroupScreen {...props} auth={firebase.auth()} database={firebase.database()}/>)}/>
        <Route exact path='/newteam' render={props=>(<NewTeamForm auth={firebase.auth()} database={firebase.database()}/>)}/>
        <Route path='/teams/:id' render={props=>(<MainContainer {...props} auth={firebase.auth()}/>)}/>
      </div>
    );
  }
}

export default App;
