import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { SocketSDK } from '../../sdk';
import { MESSAGE } from '../../configs/actionTypes';

export default class Home extends Component {
  componentDidMount() {
    this.props.connectSocket();
  }

  getUsers = () => {
    return this.props.users
      .filter(({socketId}) => socketId !== SocketSDK.socket.id)
      .map(({socketId, name}) => (
        <button key={socketId} onClick={this.props.inviteToPlay.bind(null, {
          socketId, name
        })}>
          {name}
        </button>
      ));
  }

  getInvite() {
    const { name, socketId } = this.props.inviteInfo;
    if (name) {
      return (
        <div>
          <h4>Invited by {name}</h4>
          <button onClick={this.props.acceptInvite.bind(null, socketId)}>
            accept
          </button>
          <button onClick={this.props.rejectInvite.bind(null, socketId)}>
            reject
          </button>
        </div>
      )
    }
    return null;
  }

  render() {
    if (this.props.game.start) {
      return <Redirect to='/game' />;
    }
    return (
      <div>
        <h1>Home</h1>
        <h2>Hi {this.props.user.name}</h2>
        <hr />
          { this.getUsers() }
        <hr />
          { this.getInvite() }
      </div>
    );
  }
}
