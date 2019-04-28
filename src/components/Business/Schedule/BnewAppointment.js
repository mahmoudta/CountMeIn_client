import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { API } from '../../../consts';
import Swal from 'sweetalert2';

class BnewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments_loading: false,
			authirized: true,
			client: '',
			services: [],
			today: '',
			date_from: '',
			date_until: '',
			time: '',
			loading_freetime: false,
			dates: []
		};
	}
	componentDidMount() {
		if (this.props.myBusiness.owner_id !== this.props.auth.user.sub) {
			this.setState({ authirized: false });
		} else {
			const date = new Date();
			var today =
				date.getFullYear() +
				'-' +
				('0' + (date.getMonth() + 1)).slice(-2) +
				'-' +
				('0' + date.getDate()).slice(-2);
			this.setState({ date_from: today, date_until: today, today: today });
		}
	}

	handleChange = (e) => {
		if (e.target.name === 'services') {
			const { services } = this.state;
			if (!services.includes(e.target.value) && e.target.value != -1) {
				services.push(e.target.value);
				this.setState(services);
			}
		} else {
			this.setState({ [e.target.name]: e.target.value });
		}
	};
	popService = (e) => {
		e.preventDefault();
		this.setState({
			services: this.state.services.filter((service) => {
				return service !== e.target.value;
			})
		});
	};
	Alert = async (redirect, text) => {
		Swal.fire({
			title: redirect ? 'Success' : 'Error!',
			text: text,
			type: redirect ? 'success' : 'error',
			focusConfirm: false,
			confirmButtonText: redirect ? 'done' : 'back',
			confirmButtonColor: redirect ? '#5eba00' : '#495057'
		}).then((res) => {
			if (redirect) this.context.router.history.push('/business/pages/mySchedule');
		});
	};
	fetchFreeTime = (e) => {
		e.preventDefault();
		axios
			.post(`${API}/algorithms/freetime`, {
				business: this.props.myBusiness._id,
				services: this.state.services,
				date_from: this.state.date_from,
				date_until: this.state.date_until
			})
			.then((response) => {
				console.log(response.data);
				axios
					.post(`${API}/appointments/business/setAppointmnet`, {
						business: this.props.myBusiness._id,
						client: this.state.client,
						services: this.state.services,
						date: response.data.dates[0].Date,
						start: response.data.dates[0].Free[0]._start,
						end: response.data.dates[0].Free[0]._end
					})
					.then((res) => {
						console.log(res);
						const text = `your appointment added at :  ${res.data.appointment.time.date}`;
						this.Alert(true, text);
					})
					.catch((err) => {
						const text = `error : try another date`;
						this.Alert(false, text);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	render() {
		const { authirized } = this.state;

		return (
			<section className="mt-5">
				<div className="container">
					{authirized && (
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">New Appointment</h3>
							</div>
							<div className="card-body">
								<form action="">
									<div className="row">
										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label" htmlFor="cellular">
													your customers
													<span className="form-required" />
												</label>
												<select
													className="form-control"
													name="client"
													value={this.state.client}
													onChange={this.handleChange}
													required
												>
													<option>choose customer</option>
													{this.props.customers.map((customer) => {
														return (
															<option key={customer._id} value={customer._id}>
																{customer.profile.name.first +
																	' ' +
																	customer.profile.name.last}
															</option>
														);
													})}
												</select>
											</div>
										</div>
										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label" htmlFor="">
													date from
													<span className="form-required" />
												</label>
												<input
													type="date"
													className="form-control"
													name="date_from"
													min={this.state.today}
													value={this.state.date_from}
													onChange={this.handleChange}
												/>
											</div>
										</div>

										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label" htmlFor="">
													date until
													<span className="form-required" />
												</label>
												<input
													type="date"
													className="form-control"
													name="date_until"
													min={this.state.today}
													value={this.state.date_until}
													onChange={this.handleChange}
												/>
											</div>
										</div>

										<div className="col-md-4">
											<div className="form-group">
												<label className="form-label" htmlFor="">
													services
													<span className="form-required" />
												</label>
												<select
													className="form-control"
													name="services"
													onChange={this.handleChange}
												>
													<option value="-1">choose services</option>
													{this.props.services.map((service) => {
														return (
															<option key={service._id} value={service._id}>
																{service.sub}
															</option>
														);
													})}
												</select>
												<small className="form-text text-muted">
													you can select more than one service
												</small>
											</div>
										</div>

										<div className="col-12 my-3">
											{this.state.services.length > 0 && <h6>selected services:</h6>}
											<div className="col-md-4">
												<div className="row">
													{this.state.services.map((service, i) => {
														return (
															<div key={i + service + i} className="col-12 clearfix">
																<span>{service}</span>
																<button
																	onClick={this.popService}
																	value={service}
																	className="float-right btn btn-sm btn-secondary border-0"
																>
																	<FaTimes />
																</button>
															</div>
														);
													})}
												</div>
											</div>
										</div>
										<div className="col-12">
											<button
												type="submit"
												onClick={this.fetchFreeTime}
												className="btn btn-sm btn-primary"
											>
												save
											</button>
										</div>
									</div>
								</form>
							</div>
							<div className="card-footer" />
						</div>
					)}
				</div>
			</section>
		);
	}
}

BnewAppointment.propTypes = {
	auth: PropTypes.object.isRequired,
	myBusiness: PropTypes.object.isRequired,
	customers: PropTypes.array.isRequired,
	services: PropTypes.array.isRequired
};
BnewAppointment.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	myBusiness: state.business.myBusiness,
	customers: state.business.customers,
	services: state.business.businessServices
});
export default connect(mapStatetoProps, {})(BnewAppointment);
