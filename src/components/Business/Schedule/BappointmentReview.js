import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../../globalComponents/Loading';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

import { setBusinessReview } from '../../../actions/appointmentsAction';

class BappointmentReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			overall        : 0,
			communication  : 0,
			responsiveness : 0,
			time_respect   : 0,
			feedback       : '',
			errors         : {},
			appointment    : {},
			loading        : true,
			page           : 0
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(value, name) {
		if (name !== 'feedback') {
		}
		this.setState({ [name]: value });
	}
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ loading: true });
		this.props.setBusinessReview({
			overall        : this.state.overall,
			communication  : this.state.communication,
			responsiveness : this.state.responsiveness,
			time_respect   : this.state.time_respect,
			feedback       : this.state.feedback,
			appointment_id : this.state.appointment._id,
			page           : this.state.page
		});
	}

	async componentDidMount() {
		const { appointments } = this.props;
		const appointment_id = this.props.match.params.appointment_id;
		const page = this.props.match.params.page;
		console.log(appointment_id);
		console.log(appointments);
		const selected = await appointments.find((appointment) => {
			return appointment._id.toString() === appointment_id.toString();
		});
		if (!isEmpty(selected)) {
			if (selected.review.business_review.isRated) {
			} else {
				this.setState({ loading: false, appointment: selected, page });
			}
		}
	}

	render() {
		const { loading, appointment } = this.state;
		return (
			<section className="my-5">
				<div className="container">
					<div className="row">
						{!loading ? (
							<div className="col-10 card border-0 mx-auto rounded bg-white shadow px-md-0 pb-3">
								<div className="card-header border-0 pt-5">
									<h2 className="d-block w-100 text-center">
										APPOINTMENT REVIEW - FOR {appointment.client_id.profile.name.first}
									</h2>
								</div>
								<div className="card-body">
									<form className="px-md-5">
										<h6 className="text-center font-weight-light">
											ended:{' '}
											{moment(appointment.time.date)
												.set({
													hour   : appointment.time.end._hour,
													minute : appointment.time.end._minute
												})
												.fromNow()}
										</h6>
										<p className="text-muted text-center mb-5">
											{appointment.services.map((service, i) => {
												return (
													<span key={service.service_id}>
														{i > 0 ? ',' : ''}
														{service.title}
													</span>
												);
											})}
										</p>
										<div className="row">
											<div className="col-12">
												<div className="form-group">
													<label className="form-label text-center">
														How would you rate{' '}
														<strong>{appointment.client_id.profile.name.first}</strong> on a
														scale of 1 star (Poor) to 5 stars (Excellent)?
														<span className="form-required" />
													</label>
													<div className="row mt-3">
														<div className="col-12 col-md-6 my-3 text-center">
															<label
																className="form-label text-muted"
																htmlFor="communication"
															>
																communication
															</label>
															<StarRatings
																rating={this.state.communication}
																starRatedColor="#F8CE28"
																starHoverColor="#F8CE28"
																starDimension="26px"
																starSpacing="1px"
																changeRating={true}
																numberOfStars={5}
																name="communication"
																changeRating={this.handleChange}
															/>
														</div>

														<div className="col-12 col-md-6 my-3 text-center">
															<label
																className="form-label text-muted"
																htmlFor="responsiveness"
															>
																responsiveness
															</label>
															<StarRatings
																rating={this.state.responsiveness}
																starRatedColor="#F8CE28"
																starHoverColor="#F8CE28"
																starDimension="26px"
																starSpacing="1px"
																numberOfStars={5}
																name="responsiveness"
																changeRating={this.handleChange}
															/>
														</div>

														<div className="col-12 col-md-6 my-3 text-center">
															<label
																className="form-label text-muted"
																htmlFor="time_respect"
															>
																timing
															</label>
															<StarRatings
																rating={this.state.time_respect}
																starRatedColor="#F8CE28"
																starHoverColor="#F8CE28"
																starDimension="26px"
																starSpacing="1px"
																changeRating={this.handleChange}
																numberOfStars={5}
																name="time_respect"
															/>
														</div>

														<div className="col-12 col-md-6 my-3 text-center">
															<label className="form-label text-muted" htmlFor="overall">
																overall
															</label>
															<StarRatings
																rating={this.state.overall}
																starRatedColor="#F8CE28"
																starHoverColor="#F8CE28"
																starDimension="26px"
																starSpacing="1px"
																changeRating={this.handleChange}
																numberOfStars={5}
																name="overall"
															/>
														</div>
													</div>
												</div>
												<div className="form-group">
													<div className="row">
														<label className="form-label w-100 text-center">
															Please provide any additional feedback you may have.
														</label>
														<div className="col-12 col-md-10 mx-auto">
															<textarea
																className="form-control"
																name="feedback"
																rows="4"
																onChange={(e) => {
																	this.handleChange(e.target.value, e.target.name);
																}}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
								<div className="wizard-footer clearfix">
									<div className="float-right">
										<button
											type="submit"
											className="btn btn-sm btn-primary shadow to-uppercase"
											onClick={this.handleSubmit}
										>
											Save
										</button>
									</div>
								</div>
							</div>
						) : (
							<Loading />
						)}
					</div>
				</div>
			</section>
		);
	}
}
BappointmentReview.propTypes = {
	appointments      : PropTypes.array.isRequired,
	setBusinessReview : PropTypes.func.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
	// getBusinessServices: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	myBusiness   : state.business.myBusiness,
	appointments : state.appointment.appointments
	// loading    : state.appointment.loading
});
export default connect(mapStatetoProps, { setBusinessReview })(BappointmentReview);
