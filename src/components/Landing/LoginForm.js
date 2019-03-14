import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { localSignIn } from '../../actions/userActions';
import { isAuthenticate } from '../../utils/setAuthorizationToken';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange = (e) => {
		console.log(e.target.name);
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		console.log(email, password);
		this.props.localSignIn({ email, password });
	};
	render() {
		if (isAuthenticate()) {
			return <Redirect to="/dashboard" />;
		}
		return (
			<form className="border-right p-lg-2" onSubmit={(e) => this.handleSubmit(e)}>
				<div className="form-group">
					<label htmlFor="email">Email address</label>
					<input
						type="email"
						className="form-control"
						name="email"
						placeholder="name@example.com"
						value={this.state.email}
						onChange={(e) => this.handleChange(e)}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</div>
				<button type="submit" className="btn btn-primary my-2">
					Sign in
				</button>
			</form>
		);
	}
}
LoginForm.propTypes = {
	localSignIn: PropTypes.func.isRequired
	// user: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	// user: state.user.user,
	// token: state.user.token,
	loading: state.user.loading
});
export default connect(mapStatetoProps, { localSignIn })(LoginForm);
