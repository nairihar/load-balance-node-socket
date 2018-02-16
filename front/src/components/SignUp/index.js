import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class SignUp extends Component {
  state = {
    name: '',
    password: '',
    rePassword: '',
    redirect: false
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { name, password, rePassword } = this.state;

    // will be good if we will have validation helpers or services
    if (!name || !password || !rePassword) {
      return alert('please fill all inputs');
    }
    if (password !== rePassword) {
      return alert('please check password and rePassword');
    }

    await this.props.signUp({name, password});
    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to='/signIn' />;
    }
    return (
      <form onSubmit={this.onSubmit}>
        <h1>SignUp</h1>
        <hr />
        <p>Name</p>
        <input type="text" name='name' value={this.state.value} onChange={this.onInputChange} />
        <p>Password</p>
        <input type="text" name='password' value={this.state.value} onChange={this.onInputChange} />
        <p>Re-Password</p>
        <input type="text" name='rePassword' value={this.state.value} onChange={this.onInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
