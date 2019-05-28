import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBusinessById, followBusiness, unFollowBusiness } from '../../../actions/businessActions';
import { setFlashMessage } from '../../../actions/flashMessageActions';
import { B_IMAGES } from '../../../consts';

import isEmpty from 'lodash.isempty';

import { dateToStringTime } from '../../../utils/date';
import StarRatings from 'react-star-ratings';

import { GoThumbsup } from 'react-icons/go';

import '../Business.css';

class BusinessProfile extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getBusinessById(id);
	}

	render() {
		const { business, loading } = this.props;
		return (
			<section className="my-5">
				{!loading ? (
					<section className="profile">
						{!isEmpty(business) ? (
							[
								<section key={`${business._id}-Profile-header`} className="profile-header">
									<div className="container">
										<div className="row">
											<div className="col-12 col-md-10 col-lg-8">
												<div className="row">
													<div className="col-12">
														<h1 className="h1 font-weight-light">
															{business.profile.name}
														</h1>
													</div>
													<div className="col-12 border-top py-3">
														<div className="row">
															<div className="col-12 col-md-6 border-right text-center">
																<h6>
																	<strong>Rate</strong>
																</h6>
																<h6>2.4/5</h6>

																<StarRatings
																	rating={2.05}
																	starRatedColor="#ED8600"
																	starDimension="26px"
																	starSpacing="1px"
																	// changeRating={}
																	numberOfStars={5}
																	name="rating"
																/>
															</div>
															<div className="col-12 col-md-6 text-center">
																<h6>
																	<strong>Recommendation</strong>
																</h6>
																<h6>2.4/5</h6>
																<p className="text-success">
																	<GoThumbsup />
																</p>
															</div>
														</div>
													</div>
													<div className="col-12 border-top py-3" />
												</div>
											</div>

											<div className="d-none d-lg-block col-lg-4">
												<div className="working-hours">
													<div className="col-12 card shadow">
														<h2 className="h5 tex-muted text-center py-4">Working Hours</h2>
														<div className="card-body">
															<div className="table-responsive">
																<table className="table card-table mb-0 table-vcenter text-nowrap listTable">
																	<thead>
																		<tr>
																			<th>day</th>
																			<th>time</th>
																		</tr>
																	</thead>
																	<tbody>
																		{business.working_hours.map((day) => {
																			return (
																				<tr
																					key={day.day}
																					className="text-capitalize"
																				>
																					<td>{day.day}</td>
																					{!day.opened ? (
																						<td>closed</td>
																					) : day.break.isBreak ? (
																						<td>
																							<span className="d-block w-100">{`${dateToStringTime(
																								day.from
																							)} - ${dateToStringTime(
																								day.break.from
																							)}`}</span>
																							<span className="d-block w-100">{`${dateToStringTime(
																								day.break.until
																							)} - ${dateToStringTime(
																								day.until
																							)}`}</span>
																						</td>
																					) : (
																						<td>
																							{`${dateToStringTime(
																								day.from
																							)} - ${dateToStringTime(
																								day.until
																							)}`}
																						</td>
																					)}
																				</tr>
																			);
																		})}
																	</tbody>
																</table>
															</div>
															<div className="col-12 border-top pt-2">
																<button className="btn btn-sm btn-primary w-100">
																	Set new Appointment
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>,
								<section
									key={`${business._id}-Profile-main`}
									className="profile-main bg-white shadow-sm py-4"
								>
									<div className="container">
										<div className="col-12 col-md-10 col-lg-8 my-4">
											<div className="row">
												<div className="col-12">
													<h5>
														<strong>{`About ${business.profile.name}`}</strong>
													</h5>
												</div>
												<div className="col-12">
													<div className="row">
														<div className="col-5 mx-auto col-md-3">
															<img
																src={B_IMAGES + '/' + business.profile.img}
																className="img-fluid"
																alt={business.profile.name}
															/>
														</div>
														<div className="col-12 col-md-9">
															<p>{business.profile.description}</p>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-10 col-lg-8 my-4 ">
											<div className="row">
												<div className="col-12">
													<h5>
														<strong>{`Services of ${business.profile.name}`}</strong>
													</h5>
												</div>
												<div className="col-12">
													<ul className="list-group list-group-flush">
														{business.services.map((service) => {
															return (
																<li
																	key={service.service_id._id}
																	className="list-group-item"
																>
																	{service.service_id.title}
																</li>
															);
														})}
													</ul>
												</div>
											</div>
										</div>
										<div className="col-12 col-md-10 col-lg-8 my-4 ">
											<div className="row">
												<div className="col-12">
													<h5>
														<strong>{`Clients Review`}</strong>
													</h5>
												</div>
												<div className=" col-12 border bg-light mt-3 p-md-3">
													<div className="col-12 col-12 d-flex flex-row justify-content-between">
														<p className="text-muted">
															<strong className="text-dark">30%</strong>
															Recommened
														</p>
														<p className="text-muted">
															<strong className="text-dark">3</strong>
															/5
														</p>
														{/* <div className="position-absolute">
															<StarRatings
																rating={2.05}
																starRatedColor="#ED8600"
																starDimension="22px"
																starSpacing="1px"
																// changeRating={}
																numberOfStars={5}
																name="rating"
															/>
														</div> */}
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>
							]
						) : (
							<div>no nusiness found</div>
						)}
					</section>
				) : (
					<div>...Loading</div>
				)}
			</section>
		);
	}
}
BusinessProfile.propTypes = {
	auth: PropTypes.object.isRequired,
	business: PropTypes.object.isRequired,
	getBusinessById: PropTypes.func.isRequired,
	followBusiness: PropTypes.func.isRequired,
	unFollowBusiness: PropTypes.func.isRequired,
	setFlashMessage: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	business: state.business.business,
	loading: state.business.loading
});

export default connect(mapStatetoProps, { getBusinessById, followBusiness, setFlashMessage, unFollowBusiness })(
	BusinessProfile
);
