import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Game from '../components/Game'

const mapDispatchToProps = dispatch => bindActionCreators({
  play: actions.play
}, dispatch);
const mapStateToProps = ({ user, game }) => ({ user, game });

export default connect(mapStateToProps, mapDispatchToProps)(Game);
