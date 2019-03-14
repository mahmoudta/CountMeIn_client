import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing';

// class Router extends Component {
// 	render() {
// 		const { user } = this.props;
// 		return (
// 			<div>
// 				<Router>
// 					<Route path="/" exact component={Landing} />
//                     {user &&
// 					<Route path="/about" component={About} />
// 					<Route path="/users" component={Users} />
// 					}
// 				</Router>
// 			</div>
// 		);
// 	}
// }

// Router.propTypes = {
// 	user: PropTypes.object.isRequired
// };
// const mapStatetoProps = (state) => ({
// 	user: state.user.user,
// 	token: state.user.token,
// 	loading: state.user.loading
// });
// export default connect(mapStatetoProps, {})(Router);
