import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBusinessById } from '../../actions/businessActions';
import isEmpty from 'lodash/isEmpty';

import SetFStep from './SetFStep';
import SetSecStep from './SetSecStep';
import SetThirdStep from './SetThirdStep';
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

class NewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			pickedPurpose: 'NULL',
			purposes: [],
			onBusiness: { profile: { purposes: [] } }
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePickedPurpose = this.handlePickedPurpose.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;

		if (isEmpty(this.props.purposes)) {
			this.props.getBusinessById(id).then((result) => {
				if (!result.payload.error) this.setState({ business: true });
				this.setState({ onBusiness: result.payload });
			});
		}
	}

	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handlePickedPurpose = (e) => {
		//	var pickedPurpose = this.state.pickedPurpose;
		console.log('pick purpose handler called');
		this.setState({ pickedPurpose: e.target.value });
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log('set appointment');
	};

	render() {
		const { step } = this.state;
		switch (step) {
			case 1:
				return (
					<SetFStep
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						handlePickedPurpose={this.handlePickedPurpose}
						values={this.state}
					/>
				);
			case 2:
				return (
					<SetSecStep
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleWork={this.handleWork}
						handleTime={this.handleTime}
						values={this.state}
					/>
				);
			case 3:
				return (
					<SetThirdStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						prevStep={this.prevStep}
						handleChange={this.handlePurpose}
					/>
				);
		}
	}
}
NewAppointment.propTypes = {
	auth: PropTypes.object.isRequired,
	business: PropTypes.object.isRequired,
	getBusinessById: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => ({
	//auth: state.auth,
	business: state.business.business
});

export default connect(mapStatetoProps, { getBusinessById })(NewAppointment);
