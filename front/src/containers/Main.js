import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Main from '../components/Main'

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
const mapStateToProps = ({ message }) => ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Main);
