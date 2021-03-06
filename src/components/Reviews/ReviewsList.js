import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../globalComponents/Loading';
import moment from 'moment';
import ReviewHeader from './ReviewHeader';
import ReviewBody from './ReviewBody';
import UserReviewBody from './UserReviewBody';

class ReviewsList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { page } = this.props;
		return (
			<div className="card border-top-0 shadow-sm rounded-0 border-left">
				{!this.props.loading ? (
					<div className="card-body">
						<div className="table-responsive">
							<table className="table card-table mb-0 table-vcenter">
								<thead>
									<tr>
										<th>Details</th>
										<th>Feedback</th>
										<th>Review Status</th>
										<th>action</th>
									</tr>
								</thead>
								{page === 'business' ? (
									this.props.reviews.map((review, i) => {
										return (
											<tbody key={review._id}>
												<ReviewHeader>{review.time}</ReviewHeader>
												<ReviewBody>{{ review, page }}</ReviewBody>
											</tbody>
										);
									})
								) : (
									this.props.myReview.map((review, i) => {
										return (
											<tbody key={review._id}>
												<ReviewHeader>{review.time}</ReviewHeader>
												<UserReviewBody>{{ review, page }}</UserReviewBody>
											</tbody>
										);
									})
								)}
							</table>
						</div>
					</div>
				) : (
					<Loading />
				)}
			</div>
		);
	}
}

ReviewsList.propTypes = {
	auth     : PropTypes.object.isRequired,
	reviews  : PropTypes.array.isRequired,
	myReview : PropTypes.array.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
};
const mapStatetoProps = (state) => ({
	auth     : state.auth,
	loading  : state.appointment.loading,
	reviews  : state.appointment.reviews,
	myReview : state.appointment.myReview
	// myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, {})(ReviewsList);
