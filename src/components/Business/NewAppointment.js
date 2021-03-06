import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBusinessById } from '../../actions/businessActions';
import { setFlashMessage } from '../../actions/flashMessageActions';

import SetFStep from './SetFStep';
import SetSecStep from './SetSecStep';
import SetThirdStep from './SetThirdStep';
import SetSmartSecStep from './SetSmartSecStep';

// import { convertToUtcTime } from "../../utils/date";
import axios from 'axios';
import { API } from '../../consts';
import SetSmartThirdStep from './SetSmartThirdStep';

class NewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step            : 1,
			pickedService   : 'NULL',
			date_from       : '',
			date_until      : '',
			services        : [ 0 ],
			onBusiness      : { profile: { services: [] } },
			Dates           : '',
			date            : '',
			shour           : '',
			sminute         : '',
			ehour           : '', //{free._start}
			eminute         : '', //{free._end}
			Smartdata       : [],
			Options         : [],
			selectedOptions : []
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handlePickedService = this.handlePickedService.bind(this);
		//this.fillServices = this.fillServices.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getBusinessById(id);

		//const { business } = this.props;

		const Opt = this.props.business.services.map((service) => {
			return { label: service.service_id.title, value: service._id, time: service.time, cost: service.cost };
		});
		this.setState({ Options: Opt }, () => {});
	}

	// fillServices() {

	// }

	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};
	toSmart = () => {
		//const { step } = this.state;
		this.setState({ step: 6 });
	};
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	preSetAppointment = (e) => {
		console.log('here');
	};
	handlePickedService = (e) => {
		console.log('pick Service handler called');
		this.setState({ pickedService: e.target.value });
		// this.setState(prevState => ({
		//   services: [...prevState.services, , this.state.pickedService]
		// }));
	};
	setAppointment = (e) => {
		console.log('set appointment');
		const { step } = this.state;
		const { business } = this.props;
		//request
		const shour = e.target.getAttribute('shour');
		const date = e.target.getAttribute('date');
		const sminute = e.target.getAttribute('sminute');
		const ehour = e.target.getAttribute('ehour');
		const eminute = e.target.getAttribute('emminute');
		console.log(shour, date, sminute, ehour, eminute);
		axios
			.post(`${API}/appointments/setAppointment/`, {
				businessId : business._id,
				costumerId : this.props.auth.user.sub,
				service    : [ this.state.pickedService ],
				date       : date,
				shour      : shour, //need,
				sminute    : sminute, //need,
				ehour      : ehour,
				eminute    : eminute
			})
			.then((response) => {
				//	this.setState({ dates: response.data });
				console.log(response);
			})
			.then(() => {
				this.props.setFlashMessage({
					type   : 'success',
					text   : 'Appointment is ready',
					action : { next: 'REDIRECT_TO_DASHBAORD' }
				});
			})
			.catch((err) => {
				this.props.setFlashMessage({
					type   : 'error',
					text   : 'Some error accured , Please try later',
					action : { next: 'REDIRECT_TO_DASHBAORD' }
				});
			});
	};

	// smart function call anxsso
	getSmart = (e) => {
		const timeScope = e.target.getAttribute('timeScope');
		const { step } = this.state;
		const { business } = this.props;

		axios
			.post(`${API}/algorithms/smart`, {
				businessId  : business._id,
				servicesArr : [ this.state.pickedService ],
				customerId  : this.props.auth.user.sub,
				timeScope   : Number(timeScope)
			})
			.then((response) => {
				this.setState({ Smartdata: response.data });
			})
			.then(() => {
				this.setState({ step: step + 1 });
			})
			.catch((err) => {
				this.props.setFlashMessage({
					type   : 'error',
					text   : 'Some error accured , Please try later',
					action : { next: 'REDIRECT_TO_DASHBAORD' }
				});
			});
	};

	getFreeTime = (e) => {
		const { step } = this.state;
		const { business } = this.props;
		axios
			.post(`${API}/algorithms/freetime`, {
				business   : business._id,
				services   : [ this.state.pickedService ],
				date_from  : this.state.date_from,
				date_until : this.state.date_until
			})
			.then((response) => {
				this.setState({ dates: response.data });
			})
			.catch((err) => {
				this.props.setFlashMessage({
					type   : 'error',
					text   : 'Some error accured , Please try later',
					action : { next: 'REDIRECT_TO_DASHBAORD' }
				});
			})
			.then(() => {
				this.setState({ step: step + 1 });
			});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
	};

	render() {
		const { step } = this.state;
		switch (step) {
			case 1:
				return (
					<SetFStep
						nextStep={this.nextStep}
						toSmart={this.toSmart}
						handleChange={this.handleChange}
						handlePickedService={this.handlePickedService}
						fillServices={this.fillServices}
						values={this.state}
					/>
				);
			case 2:
				return (
					<SetSecStep
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						freeTime={this.getFreeTime}
						values={this.state}
					/>
				);
			case 3:
				return (
					<SetThirdStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						prevStep={this.prevStep}
						setAppointment={this.setAppointment}
						preSetAppointment={this.preSetAppointment}
					/>
				);
			case 4:
				return <div>hey</div>;

			case 6:
				return (
					<SetSmartSecStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						getSmart={this.getSmart}
						prevStep={this.prevStep}
						setAppointment={this.setAppointment}
						preSetAppointment={this.preSetAppointment}
					/> /// SecondstepSmart
				);
			case 7:
				return (
					<SetSmartThirdStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						prevStep={this.prevStep}
						setAppointment={this.setAppointment}
					/>
				);
		}
	}
}
NewAppointment.propTypes = {
	auth            : PropTypes.object.isRequired,
	business        : PropTypes.object.isRequired,
	getBusinessById : PropTypes.func.isRequired,
	setFlashMessage : PropTypes.func.isRequired
};

const mapStatetoProps = (state) => ({
	auth     : state.auth,
	business : state.business.business
});

export default connect(mapStatetoProps, { getBusinessById, setFlashMessage })(NewAppointment);
