import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { localSignIn } from '../../actions/authActions';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			error: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		this.props.localSignIn({ email, password }).then((result) => {
			const { error } = this.props;
			if (error === '') {
				// return <Redirect to="/dashboard" />;
				this.context.router.history.push('/dashboard');
			} else {
				this.setState({ error });
			}
		});
	};
	render() {
		return (
			<form className="border-right p-lg-2" onSubmit={(e) => this.handleSubmit(e)}>
				<div className="alert alert-danger">{this.props.error}</div>
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
};
LoginForm.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	error: state.auth.error
});

export default connect(mapStatetoProps, { localSignIn })(LoginForm);
