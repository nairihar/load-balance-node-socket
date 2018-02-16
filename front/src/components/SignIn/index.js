import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { ApiSdk } from '../../sdk';

export default class SignIn extends Component {
  state = {
    name: '',
    password: '',
    redirect: false
  };

  componentDidMount() {
    localStorage.accessToken = '';
  }

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { name, password } = this.state;
    // will be good if we will have validation helpers or services
    if (!name || !password) {
      return alert('please fill all inputs');
    }

    await this.props.signIn({
      name,
      password
    });
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/home' />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h1>SignIn</h1>
        <hr />
        <p>Name</p>
        <input type="text" name='name' value={this.state.value} onChange={this.onInputChange} />
        <p>Password</p>
        <input type="text" name='password' value={this.state.value} onChange={this.onInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
