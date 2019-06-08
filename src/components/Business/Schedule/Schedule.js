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
			dateNow     : getCurrentDate(),
			date        : '',
			customer_id : '',
			services    : []
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
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-8">
							<div className="card border-0 shadow">
								<div className="card-header text-center bg-secondary text-white">
									<h6 className="card-title w-100 text-center">Up Coming</h6>
								</div>
							</div>
						</div>

						<div className="col-12 col-lg-4">
							<div className="card">
								<div className="card-header">
									<h6 className="card-title">New Appointment</h6>
								</div>
								<div className="card-body">
									<form>
										<div className="row">
											<div className="col-12">
												<div className="form-group">
													<label className="form-label">Services:</label>
												</div>
											</div>
											<div className="col-6">
												<div className="form-group">
													<label className="form-label">Customer</label>
												</div>
											</div>
											<div className="col-8 mx-auto col-lg-12">
												<button className="btn btn-sm btn-primary w-100">
													Search free time
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
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
	auth                          : PropTypes.object.isRequired,
	getBusinessByOwner            : PropTypes.func.isRequired,
	myBusiness                    : PropTypes.object.isRequired,
	// customers: PropTypes.array.isRequired,
	// services: PropTypes.array.isRequired,
	getBusinessAppointmentsByDate : PropTypes.func.isRequired
};
Schedule.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth : state.auth
	// myBusiness: state.business.myBusiness
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, { getBusinessAppointmentsByDate, getBusinessByOwner })(Schedule);
