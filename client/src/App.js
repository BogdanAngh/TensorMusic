import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ProfileScreen from './components/ProfileScreen';
import MainScreen from './components/MainScreen'
import WelcomeScreen from './components/WelcomeScreen'
import YouLost from './components/YouLost'
import 'bootstrap/dist/css/bootstrap.min.css';

if(localStorage.jwtToken){
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        store.dispatch(logoutUser());
        window.location.href = '/login'
    }
}

class App extends Component {
  render() { 
    return (
      <Provider store = { store }>
        <Router>
            <div>
              <Navbar />
              <Switch>
              <Route exact path="/" component={ WelcomeScreen } />
              
                <Route exact path="/register"     component={ Register }/>
                <Route exact path="/login"        component={ Login } />
                <Route exact path="/rocknroll"    component={ MainScreen } />
                <Route exact path="/profile"      component={ ProfileScreen} />
                
              
              <Route component={ YouLost }/>
              </Switch>
              
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
