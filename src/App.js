import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isAuthenticate } from './utils/setAuthorizationToken';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* all the componenets for different Routes */
import Header from './components/globalComponents/Header';
import Navbar from './components/globalComponents/Navbar.js';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			authenticate: false
		};
	}

	// componentWillMount = () => {
	// 	const authenticate = isAuthenticate();
	// 	this.setState({ authenticate });
	// };
	componentDidMount = () => {
		console.log();
		const authenticate = isAuthenticate();
		this.setState({ authenticate });
	};
	// componentDidMount() {
	// 	const authenticate = isAuthenticate();
	// 	this.setState({ authenticate });
	// }
	render() {
		const { user } = this.props;
		console.log(user);
		return (
			<Router>
				<div className="wrapper">
					{this.state.authenticate && (
						<div id="sidebar">
							<Navbar />
						</div>
					)}

					<div id="content" className="bg-light">
						{this.state.authenticate && <Header />}
						<section className="px-3 py-1 text-muted border-bottom">welcome back </section>

						<Route path="/" exact component={Landing} />
						<Route path="/dashboard" component={Dashboard} />
					</div>
				</div>
			</Router>
		);
	}
}
// export default App;
App.propTypes = {
	user: PropTypes.object
};
const mapStatetoProps = (state) => ({
	user: state.user.user,
	// token: state.user.token,
	loading: state.user.loading
});
export default connect(mapStatetoProps, {})(App);
