import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import PrivateRoute from '../PrivateRoute';
import Welcome from '../Welcome';
import SignIn from '../../containers/SignIn';
import SignUp from '../../containers/SignUp';
import Home from '../../containers/Home';
import Game from '../../containers/Game';

export default class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          {
            this.props.message && <p>Message : { this.props.message }</p>
          }
          <h3><Link to="/signIn">SignIn</Link></h3>
          <h3><Link to="/signUp">SignUp</Link></h3>
          <h3><Link to="/home">Home</Link></h3>

          <Route exact path="/" component={Welcome} />
          <Route path="/signIn" component={SignIn} />
          <Route path="/signUp" component={SignUp} />
          <PrivateRoute path='/home' component={Home} />
          <PrivateRoute path='/game' component={Game} />
        </div>
      </Router>
    );
  }
}
