import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddReminder from '@material-ui/icons/AddAlert';
import { connect } from 'react-redux';

import {
	getBusinessById,
	followBusiness,
	unFollowBusiness,
	getReviewsForProfilePage
} from '../../../actions/businessActions';
import { setFlashMessage } from '../../../actions/flashMessageActions';
import { B_IMAGES } from '../../../consts';
import { NavLink } from 'react-router-dom';

import isEmpty from 'lodash.isempty';

import { dateToStringTime } from '../../../utils/date';
import StarRatings from 'react-star-ratings';

import { GoThumbsup } from 'react-icons/go';

import '../Business.css';
import Loading from '../../globalComponents/Loading';
import ReviewsComponents from './ReviewsComponents';

class BusinessProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			review_page   : 1,

			business      : false,
			loading       : false,

			loadingFollow : false
		};
		this.showButtons = this.showButtons.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getBusinessById(id);
		this.props.getReviewsForProfilePage(id, 1);
	}

	showButtons = () => {
		const { business, loading } = this.props;
		const isOwner = business.owner_id === this.props.auth.user.sub;
		if (isOwner) {
			return (
				<NavLink
					key={`editProfile${business._id}`}
					to={'/business/edit'}
					className=" mx-2 btn btn-sm btn-secondary"
				>
					Edit Profile
				</NavLink>
			);
		}
		if (business.isFollower) {
			return (
				<button
					key={`unfollow${business._id}`}
					className="btn btn-sm btn-secondary"
					disabled={this.state.loading}
					onClick={() => this.unfollowBusiness(business._id)}
				>
					{this.state.loading ? (
						<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
					) : (
						'UnFollow'
					)}
				</button>
			);
		}
		return (
			<button
				key={`follow${business._id}`}
				className="btn btn-sm btn-primary"
				disabled={loading}
				onClick={() => this.followBusiness(business._id)}
			>
				{this.state.loading ? (
					<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
				) : (
					'Follow'
				)}
			</button>
		);
	};
	followBusiness = (business_id) => {
		this.setState({ loading: true });
		this.props.followBusiness(business_id).then((res) => {
			this.setState({ loading: false });
		});
	};

	unfollowBusiness = (business_id) => {
		this.props.setFlashMessage({
			type   : 'warning',
			text   : 'Are You sure You want to UnFollow?',
			action : {
				CancelButton : true,
				confirmText  : 'UnFollow',
				next         : 'UNFOLLOW_BUSINESS',
				business_id
			}
		});
	};
	render() {
		const { business, loading } = this.props;
		var recommend = 0,
			avg = 0;

		if (!isEmpty(business)) {
			const { rating } = this.props.business.profile;

			recommend =
				rating.rating_count > 0 ? (rating.recommendation_sum / rating.rating_count * 100).toFixed(2) : 0;
			avg = rating.rating_count > 0 ? rating.rating_sum / rating.rating_count : 0;
		}
		const isOwner = business.owner_id === this.props.auth.user.sub;
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
														<h1 className="h1 mb-2 font-weight-light d-flex justify-content-between align-items-center">
															<span>{business.profile.name}</span>
															<span>{this.showButtons()}</span>
														</h1>
													</div>
													<div className="col-12">
														<div className="row">
															<div className="col-12 col-md-6 border border-left-0 py-3 text-center">
																{this.props.business.profile.rating.rating_count > 0 ? (
																	<h6>
																		{avg.toFixed(2)}/<span className="font-weight-normal">5</span>
																	</h6>
																) : (
																	''
																)}

																<StarRatings
																	rating={avg}
																	starRatedColor="#F8CE28"
																	starDimension="26px"
																	starSpacing="1px"
																	numberOfStars={5}
																/>
																<h6 className="text-muted mt-2">
																	{this.props.business.profile.rating.rating_count}{' '}
																	Reviews
																</h6>
															</div>
															<div className="col-12 col-md-6 border border-left-0 border-right-0 py-3 text-center">
																<h6>
																	<strong>
																		{recommend > 0 ? recommend > 50 ? (
																			<span>
																				{recommend}
																				{'% '} recommend
																			</span>
																		) : (
																			''
																		) : (
																			'No recommendation'
																		)}
																	</strong>
																</h6>

																<p
																	className={`${recommend > 50
																		? 'text-success'
																		: 'text-muted'}`}
																>
																	<GoThumbsup />
																</p>
															</div>
														</div>
													</div>
													<div className="col-12 py-3 text-center text-lg-left">
														{!isOwner ? (
															<NavLink
																to={`/business/new-appointment/${this.props.business
																	._id}`}
																className="btn btn-sm btn-primary"
															>
																Set new Appointment
															</NavLink>
														) : (
															''
														)}
													</div>
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
																{!isOwner && (
																	<NavLink
																		to={`/business/new-appointment/${this.props
																			.business._id}`}
																		className="btn btn-sm btn-primary w-100"
																	>
																		Set new Appointment
																	</NavLink>
																)}
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
																	className="list-group-item justofy content"
																>
																	{service.service_id.title}
																</li>
															);
														})}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</section>,
								<section key={`${business._id}-ClientReview`}>
									<ReviewsComponents />
								</section>
							]
						) : (
							<div>no business found</div>
						)}
					</section>
				) : (
					<Loading />
				)}
			</section>
		);
	}
}
BusinessProfile.propTypes = {
	auth                     : PropTypes.object.isRequired,
	business                 : PropTypes.object.isRequired,
	getBusinessById          : PropTypes.func.isRequired,
	followBusiness           : PropTypes.func.isRequired,
	unFollowBusiness         : PropTypes.func.isRequired,
	setFlashMessage          : PropTypes.func.isRequired,
	getReviewsForProfilePage : PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth     : state.auth,
	business : state.business.business,
	loading  : state.business.loading
});

export default connect(mapStatetoProps, {
	getBusinessById,
	followBusiness,
	setFlashMessage,
	unFollowBusiness,
	getReviewsForProfilePage
})(BusinessProfile);
