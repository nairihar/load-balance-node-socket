import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actions from '../actions';
import SignUp from '../components/SignUp'

const mapDispatchToProps = dispatch => bindActionCreators({
  signUp: actions.signUp
}, dispatch);
const mapStateToProps = ({ }) => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
