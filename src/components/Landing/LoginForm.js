import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { localSignIn } from '../../actions/authActions';
import logo from '../../images/logo.png';
import isEmpty from 'lodash.isempty';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Email from '@material-ui/icons/Email';

// core
import GridContainer from '../Interface/Grid/GridContainer.jsx';
import GridItem from '../Interface/Grid/GridItem.jsx';
import CustomInput from '../Interface/CustomInput/CustomInput.jsx';
import Button from '../Interface/CustomButtons/Button.jsx';
import Card from '../Interface/Card/Card.jsx';
import CardBody from '../Interface/Card/CardBody.jsx';
import CardHeader from '../Interface/Card/CardHeader.jsx';
import CardFooter from '../Interface/Card/CardFooter.jsx';

import loginPageStyle from '../Interface/Assets/loginPageStyle';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			error: '',
			cardAnimaton: 'cardHidden'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount() {
		this.timeOutFunction = setTimeout(
			function () {
				this.setState({ cardAnimaton: '' });
			}.bind(this),
			700
		);
	}
	componentWillUnmount() {
		clearTimeout(this.timeOutFunction);
		this.timeOutFunction = null;
	}

	handleChange = (e, d) => {
		if (d === 'email') this.setState({ email: e.target.value });
		if (d === 'password') this.setState({ password: e.target.value });
	};
	handleSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		const param = window.location.search.split('=')[1];

		this.props.localSignIn({ email, password }).then((result) => {
			const { error } = this.props;
			if (error === 'param') {
				this.context.router.history.push('/dashboard');
			} else {
				this.setState({ error });
			}
		});
	};
	render() {
		const { isAuthenticated } = this.props;
		const { classes } = this.props;

		if (!isAuthenticated) {
			return (
				<div className={classes.container}>
					<GridContainer justify="center">
						<GridItem xs={12} sm={6} md={4}>
							<form>
								<Card login className={classes[this.state.cardAnimaton]}>
									<CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="CMI">
										<img src={logo} alt="" className="img-fluid" />
										<h4 className={classes.cardTitle}>Log in</h4>
										{/* <div className={classes.socialLine}>
											{[
												'fab fa-facebook-square',
												'fab fa-twitter',
												'fab fa-google-plus'
											].map((prop, key) => {
												return (
													<Button
														color="transparent"
														justIcon
														key={key}
														className={classes.customButtonClass}
													>
														<i className={prop} />
													</Button>
												);
											})}
										</div> */}
									</CardHeader>
									<CardBody>
										{this.props.error ? (
											<div className="alert alert-danger">{this.props.error}</div>
										) : (
												<div />
											)}
										<CustomInput
											labelText="Email..."
											id="email"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												onChange: (event) => this.handleChange(event, 'email'),
												endAdornment: (
													<InputAdornment position="end">
														<Email className={classes.inputAdornmentIcon} />
													</InputAdornment>
												)
											}}
										/>
										<CustomInput
											labelText="Password"
											id="password"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												type: 'password',
												onChange: (event) => this.handleChange(event, 'password'),
												endAdornment: (
													<InputAdornment position="end">
														<Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
													</InputAdornment>
												)
											}}
										/>
									</CardBody>
									<CardFooter className={classes.justifyContentCenter}>
										<Button
											type="submit"
											color="success"
											simple
											size="lg"
											block
											onClick={(e) => this.handleSubmit(e)}
										>
											Let's Go
										</Button>
										<Button color="info" simple size="lg" block href="/signup">
											Join Us
										</Button>
									</CardFooter>
								</Card>
							</form>
						</GridItem>
					</GridContainer>
				</div>
			);
		} else {
			this.context.router.history.push('/dashboard');
			return null;
		}
	}
}
LoginForm.propTypes = {
	localSignIn: PropTypes.func.isRequired
};
LoginForm.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	error: state.auth.error,
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStatetoProps, { localSignIn })(withStyles(loginPageStyle)(LoginForm));
