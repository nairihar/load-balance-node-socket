import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import Home from '../components/Home';

const mapDispatchToProps = dispatch => bindActionCreators({
  inviteToPlay: actions.invite,
  connectSocket: actions.connectSocket,
  acceptInvite: actions.acceptInvite,
  rejectInvite: actions.rejectInvite,
}, dispatch);
const mapStateToProps = ({ user, users, inviteInfo, game }) => ({ user, users, inviteInfo, game });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
