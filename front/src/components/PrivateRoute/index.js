import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'

// now working correct
export default class PrivateRoute extends Component {
  privateRender = (props) => {
    const Component = this.props.component;
    if (localStorage.accessToken) {
      return <Component {...props} />;
    }
    return <Redirect to='/signIn' />;
  };

  render() {
    const props = {
      ...this.props,
      component: null
    };
    return (
      <Route {...props} render={this.privateRender} />
    );
  }
}
