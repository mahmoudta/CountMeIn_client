import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReviewList from './ReviewsList';
import { getReviewsByBusiness } from '../../actions/appointmentsAction';

class ReviewsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page : 'business'
		};
	}

	componentDidMount() {
		this.props.getReviewsByBusiness(this.props.auth.user.business_id);
	}
	render() {
		return (
			<section className="my-5">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<ul className="nav nav-tabs">
								<li className="nav-item">
									<NavLink
										to="#"
										className={`nav-link text-uppercase ${this.state.page == 'customers'
											? 'active'
											: ''}`}
										onClick={(e) => {
											e.preventDefault();
											this.setState({ page: 'customers' });
										}}
									>
										my reviews
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="#"
										className={`nav-link text-uppercase ${this.state.page == 'business'
											? 'active'
											: ''}`}
										onClick={(e) => {
											e.preventDefault();
											this.setState({ page: 'business' });
										}}
									>
										my business reviews
									</NavLink>
								</li>
							</ul>
							{this.state.customer ? <ReviewList page="customers" /> : <ReviewList page="business" />}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
ReviewsMain.propTypes = {
	auth                 : PropTypes.object.isRequired,
	getReviewsByBusiness : PropTypes.func.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
	// getBusinessServices: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth : state.auth
	// myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, { getReviewsByBusiness })(ReviewsMain);
