import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import StarRatings from 'react-star-ratings';
import { GoThumbsup } from 'react-icons/go';
import isEmpty from 'lodash.isempty';

// import Loading from '../../globalComponents/Loading';

class ReviewsComponents extends Component {
	render() {
		const { rating } = this.props.business.profile;
		var recommend = 0,
			avg = 0;
		if (!isEmpty(rating)) {
			recommend =
				rating.rating_count > 0 ? (rating.recommendation_sum / rating.rating_count * 100).toFixed(2) : 0;
			avg = rating.rating_count > 0 ? rating.rating_sum / rating.rating_count : 0;
		}
		return (
			<div className="container">
				<div className="col-12 col-md-10 col-lg-8 my-4 ">
					<div className="row">
						<div className="col-12">
							<h5>
								<strong>{`Clients Review`}</strong>
							</h5>
						</div>
						<div className=" col-12 border bg-white mt-3 p-3">
							<div className="col-12 col-12 d-flex flex-row justify-content-between">
								<div className="text-muted">
									{recommend > 0 ? (
										<p className="text-muted">
											<strong className="text-dark">{`${recommend}%`}</strong>
											<span className={`${recommend > 50 ? 'text-success' : 'text-muted'}`}>
												{' '}
												<GoThumbsup />
											</span>
											<small className="d-block w-100">recommend</small>
										</p>
									) : (
										<p className="text-muted">no recommendation</p>
									)}
									<p className="w-100 d-block mt-3 mb-0">
										<strong>{rating.rating_count}</strong>
										<span>{'  '}Reviews</span>
									</p>
								</div>

								<div className="text-muted text-center">
									<p className="mb-1 d-block w-100">
										<strong className="text-dark">{avg.toFixed(2)}</strong>
										<span>/5</span>
									</p>

									<StarRatings
										rating={avg}
										starRatedColor="#F8CE28"
										starDimension="22px"
										starSpacing="1px"
										// changeRating={}
										numberOfStars={5}
									/>
								</div>
							</div>
						</div>
						{!this.props.reviewLoading ? (
							<div className="col-12 p-3">
								{this.props.reviews.docs.length > 0 ? (
									this.props.reviews.docs.map((review) => {
										return (
											<div key={review._id} className="col-12 border-top py-3">
												<div className="review-header d-flex justify-content-between">
													<div className="">
														<StarRatings
															rating={review.customer_review.avg_rated}
															starRatedColor="#F8CE28"
															starDimension="15px"
															starSpacing="1px"
															// changeRating={}
															numberOfStars={5}
															name="rating"
														/>
														<p className="d-flex w-100 mb-1 ">
															{review.appointment_id.services.map((service, i) => {
																return (
																	<small key={service._id}>
																		{i > 0 ? ' ,' : ''}
																		{service.title}
																	</small>
																);
															})}
														</p>
													</div>
													<div className="justify-content-center">
														<p
															className={`text-center mb-1 ${review.customer_review
																? 'text-success'
																: 'text-muted'}`}
														>
															<GoThumbsup />
														</p>
														<small>
															{moment(review.customer_review.created_time).fromNow()}
														</small>
													</div>
												</div>
												<div className="review main">{review.customer_review.feedback}</div>
											</div>
										);
									})
								) : (
									<p className="w-100 text-center text-muted">No reviews to show</p>
								)}
							</div>
						) : (
							<div className="col-12">
								<div className="row">
									<div className="col-2 col-lg-1 mx-auto">
										<img
											className="img-fluid"
											alt="countMein_loading"
											src={process.env.PUBLIC_URL + '/loading.gif'}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}
ReviewsComponents.propTypes = {
	reviews  : PropTypes.object.isRequired,
	business : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	reviews       : state.business.reviews,
	reviewLoading : state.business.reviewLoading,
	business      : state.business.business
});

export default connect(mapStatetoProps, {})(ReviewsComponents);
