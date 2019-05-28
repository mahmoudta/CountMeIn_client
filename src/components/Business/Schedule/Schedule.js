import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* COMPONENTS */
import StatsticsScheduleHeader from './StatsticsScheduleHeader';
import TimeLine from './TimeLine';

/* UTILS */
import { getCurrentDate } from '../../../utils/date';
import { getBusinessAppointmentsByDate } from '../../../actions/appointmentsAction';
import { getBusinessByOwner } from '../../../actions/businessActions';

/* STYLES */
import './Schedule.css';

class Schedule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateNow: getCurrentDate(),
			date: '',
			customer_id: '',
			services: []
		};
		this.changeDate = this.changeDate.bind(this);
		this.handleNewAppointmentForm = this.handleNewAppointmentForm.bind(this);
	}

	handleNewAppointmentForm() {
		console.log('okaaay');
	}
	componentDidMount() {
		const { dateNow } = this.state;
		const { user } = this.props.auth;
		this.props.getBusinessByOwner(user.sub);
		this.props.getBusinessAppointmentsByDate(user.business_id, dateNow);
		this.setState({ date: dateNow });
	}

	changeDate(e) {
		const { name, value } = e.target;
		const { user } = this.props.auth;
		const { date } = this.state;
		if (value !== date) {
			this.props.getBusinessAppointmentsByDate(user.business_id, value);
			this.setState({ [name]: value });
		}
	}
	render() {
		return (
			<section key={'mainSchedule'} className="my-5">
				<StatsticsScheduleHeader />
				<TimeLine
					date={this.state.date}
					changeDate={this.changeDate}
					handleNewAppointmentForm={this.state.handleNewAppointmentForm}
				/>
			</section>
		);
	}
}

Schedule.propTypes = {
	auth: PropTypes.object.isRequired,
	getBusinessByOwner: PropTypes.func.isRequired,
	// myBusiness: PropTypes.object.isRequired,
	// customers: PropTypes.array.isRequired,
	// services: PropTypes.array.isRequired,
	getBusinessAppointmentsByDate: PropTypes.func.isRequired
};
Schedule.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth
	// myBusiness: state.business.myBusiness
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, { getBusinessAppointmentsByDate, getBusinessByOwner })(Schedule);
