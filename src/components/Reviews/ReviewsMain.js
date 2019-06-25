import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReviewList from './ReviewsList';
import { getReviewsByBusiness, getReviewAsCustomer } from '../../actions/appointmentsAction';

class ReviewsMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page : 'customer'
		};
		this.selectPage = this.selectPage.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.user.isBusinessOwner) this.props.getReviewsByBusiness(this.props.auth.user.business_id);
		this.props.getReviewAsCustomer();
	}
	selectPage = (e, name) => {
		this.setState({ page: name });
	};
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
										className={`nav-link text-uppercase ${this.state.page === 'customer'
											? 'active'
											: ''}`}
										onClick={(e) => {
											e.preventDefault();
											this.selectPage(e, 'customer');
										}}
									>
										my reviews
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink
										to="#"
										className={`nav-link text-uppercase ${this.state.page === 'business'
											? 'active'
											: ''}`}
										onClick={(e) => {
											e.preventDefault();
											this.selectPage(e, 'business');
										}}
									>
										my business reviews
									</NavLink>
								</li>
							</ul>
							{this.state.page === 'customer' ? (
								<ReviewList page="customer" />
							) : (
								<ReviewList page="business" />
							)}
						</div>
					</div>
				</div>
			</section>
		);
	}
}
ReviewsMain.propTypes = {
	auth                 : PropTypes.object.isRequired,
	getReviewsByBusiness : PropTypes.func.isRequired,
	getReviewAsCustomer  : PropTypes.func.isRequired

	// getBusinessCustomers: PropTypes.func.isRequired,
	// getBusinessServices: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth : state.auth
	// myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, { getReviewsByBusiness, getReviewAsCustomer })(ReviewsMain);
