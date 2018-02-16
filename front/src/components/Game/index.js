import React, { Component } from 'react';

export default class Game extends Component {
  state = {
    q1: '',
    q2: '',
    q3: ''
  };

  onInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  inputDisabled(n) {
    const myIndex = this.props.game.players.indexOf(this.props.user.name);
    const disabled = this.props.game.played[myIndex][n];
    return disabled;
  }

  getPoints() {
    return this.props.game.played.map(res => {
      return res.filter(b => b === true).length
    });
  }

  render() {
    const points = this.getPoints();
    return (
      <div>
        <h1>Game</h1>
        <h2>{this.props.game.players[0]} vs {this.props.game.players[1]}</h2>
        <p>
          {this.props.game.players[0]} - {points[0]}/3
          --
          {this.props.game.players[1]} - {points[1]}/3
        </p>
        <hr />
          <p>5+10=?</p>
          <input
            type="text"
            name='q1'
            value={this.state.value}
            onChange={this.onInputChange}
            disabled={this.inputDisabled(0)}
          />
          <button onClick={this.props.play.bind(null, {
            n: 0,
            v: this.state.q1
          })}>Play</button>
        <hr />
          <p>5+5=?</p>
          <input
            type="text"
            name='q2'
            value={this.state.value}
            onChange={this.onInputChange}
            disabled={this.inputDisabled(1)}
          />
          <button onClick={this.props.play.bind(null, {
            n: 1,
            v: this.state.q2
          })}>Play</button>
        <hr />
          <p>5+0=?</p>
          <input
            type="text"
            name='q3'
            value={this.state.value}
            onChange={this.onInputChange}
            disabled={this.inputDisabled(2)}
          />
          <button onClick={this.props.play.bind(null, {
            n: 2,
            v: this.state.q3
          })}>Play</button>
      </div>
    );
  }
}
