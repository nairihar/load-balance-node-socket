import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import SignIn from '../components/SignIn'

const mapDispatchToProps = dispatch => bindActionCreators({
  signIn: actions.signIn
}, dispatch);
const mapStateToProps = ({ }) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
