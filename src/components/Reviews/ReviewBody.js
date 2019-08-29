import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { NavLink } from 'react-router-dom';

export default class ReviewBody extends Component {
	render() {
		const { review } = this.props.children;

		return (
			<tr>
				<td>
					<p>
						<span className="d-block w-100">{`${review.client_id.profile.name.first} ${review.client_id
							.profile.name.last}`}</span>

						<span className="d-block w-100">
							<strong>SERVICES:</strong>
						</span>
						<span>
							{review.services.map((service, i) => {
								return (
									<span key={service._id}>
										{i > 0 ? ' , ' : ''}
										{service.title}
									</span>
								);
							})}
						</span>
					</p>
				</td>
				<td>
					<div className="d-table-cell">
						<span className="d-block w-100">
							<span className="d-block w-100">
								<strong> Feedback I Left</strong>
							</span>
						</span>
						<StarRatings
							className="d-none"
							rating={review.review.business_review.isRated ? review.review.business_review.avg_rated : 0}
							starRatedColor="#ED8600"
							starDimension="15px"
							starSpacing="1px"
							// changeRating={}
							numberOfStars={5}
						/>
						<small className="d-block w-100">{review.review.business_review.feedback}</small>
						<hr className="w-100" />
						{!review.review.customer_review.anynmous && (
							<span className="w-100">
								<span className="d-block w-100">
									<strong> Feedback I Recived</strong>
								</span>
								<StarRatings
									className="d-none"
									rating={
										review.review.customer_review.isRated ? (
											review.review.customer_review.avg_rated
										) : (
											0
										)
									}
									starRatedColor="#ED8600"
									starDimension="15px"
									starSpacing="1px"
									// changeRating={}
									numberOfStars={5}
								/>
								<small className="d-block w-100">{review.review.customer_review.feedback}</small>
							</span>
						)}
					</div>
				</td>
				<td>
					<p>
						{review.review.business_review.isRated ? (
							<span>
								<span className="d-block w-100">Completed</span>
								<span>{moment(review.review.business_review.created_time).fromNow()}</span>
							</span>
						) : (
							<span>Awaiting</span>
						)}
					</p>
				</td>
				<td>
					{!review.review.business_review.isRated && (
						<NavLink
							to={`/business/appointment-review/${review.review.appointment_id}-2`}
							className="btn btn-secondary"
						>
							Leave Feedback
						</NavLink>
					)}
				</td>
			</tr>
		);
	}
}
