import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBusinessById, followBusiness, unFollowBusiness } from '../../actions/businessActions';
import { setFlashMessage } from '../../actions/flashMessageActions';
import { B_IMAGES } from '../../consts';
// import axios from 'axios';
// import { API } from '../../consts';
import isEmpty from 'lodash.isempty';

import './Business.css';

class ClientView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			business: false,
			loading: false,
			followed: false,
			loadingFollow: false
			// style: {
			// 	'.header': {
			// 		background: 'green',
			// 		font: 'yellow'
			// 	}
			// }
		};
		this.showButtons = this.showButtons.bind(this);
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		this.props.getBusinessById(id);
	}

	showButtons = () => {
		const { business, loading } = this.props;
		const isOwner = business.owner_id === this.props.auth.user.sub;
		if (isOwner) {
			return [
				<NavLink
					key={`editProfile${business._id}`}
					to={'/business/edit'}
					className=" mx-2 btn btn-sm btn-secondary"
					// onClick={() => this.unfollowBusiness(business._id)}
				>
					Edit Profile
				</NavLink>,
				<NavLink
					key={`editView${business._id}`}
					to={'/business/edit'}
					className=" mx-2 btn btn-sm btn-secondary"
					// onClick={() => this.unfollowBusiness(business._id)}
				>
					Customize View
				</NavLink>
			];
		}
		if (business.isFollower) {
			return [
				<button
					key={`unfollow${business._id}`}
					className="btn btn-sm btn-secondary"
					disabled={loading}
					onClick={() => this.unfollowBusiness(business._id)}
				>
					{loading ? (
						<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
					) : (
						'UnFollow'
					)}
				</button>
			];
		}
		return [
			<button
				key={`follow${business._id}`}
				className="btn btn-sm btn-primary"
				disabled={loading}
				onClick={() => this.followBusiness(business._id)}
			>
				{loading ? (
					<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
				) : (
					'Follow'
				)}
			</button>
		];
	};

	followBusiness = (business_id) => {
		this.props.followBusiness(business_id);
	};

	unfollowBusiness = (business_id) => {
		this.props.setFlashMessage({
			type: 'warning',
			text: 'Are You sure You want to UnFollow?',
			action: {
				CancelButton: true,
				confirmText: 'Delete',
				next: 'UNFOLLOW_BUSINESS',
				business_id
			}
		});
	};

	render() {
		// var stringStyle = '';
		// for (let key in this.state.style) {
		// 	stringStyle += key + '{';
		// 	for (let inner in this.state.style[key]) {
		// 		stringStyle += inner + ':' + this.state.style[key][inner] + ';';
		// 	}
		// 	stringStyle += '}';
		// }
		// console.log(stringStyle);
		// 	<link
		// 	rel="stylesheet"
		// 	type="text/css"
		// 	href="https://drive.google.com/uc?id=1batJ1VAiU_yXbdlHSFpoprebS8__ceQ0"
		// />
		const { business } = this.props;
		const isOwner = business.owner_id === this.props.auth.user.sub;
		const buttons = this.showButtons();
		// is!isEmpty(business)
		return (
			<section className="mt-5">
				{/* <style>{stringStyle}</style> */}
				{!isEmpty(business) ? (
					<div className="container">
						<div className="row">
							<div className="col-12 header">
								<div className="row">
									<div className="col-2">
										<img
											className="img-fluid rounded-circle"
											src={B_IMAGES + '/' + business.profile.img}
											alt=""
										/>
									</div>
									<div className="col-8 offset-md-1">
										<div className="row">
											<div className="title-container col-12  ">
												<h1 className="h3 title">{business.profile.name}</h1>
												<div>
													<span>
														{buttons.map((button) => {
															return button;
														})}
													</span>
												</div>
											</div>
										</div>

										<p>
											<span className="mr-2 follower">
												<strong>{business.followers} </strong>followers
											</span>
											<span className="mx-2">
												<NavLink to="#">
													<strong>200 </strong>review
												</NavLink>
											</span>
										</p>
										<p>
											<img
												src="http://www.sclance.com/pngs/5-star-rating-png/5_star_rating_png_8434.png"
												alt="rating"
												height="22/"
												width="auto"
											/>
										</p>
										<p>{business.profile.description}</p>
										{!isOwner && (
											<NavLink
												to={'/business/new-appointment/' + this.props.business._id}
												className="btn btn-sm btn-primary"
												// businessValues={this.state}
											>
												new appointment
											</NavLink>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="mx-auto spinner-border" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</section>
		);
	}
}

ClientView.propTypes = {
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
	ClientView
);
