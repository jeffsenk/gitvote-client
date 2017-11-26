import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import LandingScreen from './components/LandingScreen'
import MainContainer from './components/MainContainer'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

class App extends Component {

  render() {
    const main={
      height:'100%'
    }
    return (
      <div style={main}>
        <Route exact path='/' component={LandingScreen}/>
        <Route path='/main' component={MainContainer}/>
      </div>
    );
  }
}

export default App;
