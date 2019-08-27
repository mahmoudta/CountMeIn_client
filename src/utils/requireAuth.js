import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import router from '../router/router'

export default function(ComposedComponent) {
	class Authenticate extends Component {
		componentWillMount() {
			if (!this.props.isAuthenticated) {
				this.context.router.history.push(`/${this.props.location.search ? this.props.location.search : ''}`);
			}
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.context.router.history.push(`/${this.props.location.search ? this.props.location.search : ''}`);
			}
		}
	}

	Authenticate.propTypes = {
		isAuthenticated : PropTypes.bool.isRequired
	};

	Authenticate.contextTypes = {
		router : PropTypes.object.isRequired
	};

	function mapStateToProps(state) {
		return {
			isAuthenticated : state.auth.isAuthenticated
		};
	}

	return connect(mapStateToProps)(Authenticate);
}
