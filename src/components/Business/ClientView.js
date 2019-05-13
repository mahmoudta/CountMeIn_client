import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBusinessById } from '../../actions/businessActions';
import axios from 'axios';
import { API } from '../../consts';

import './Business.css';

class ClientView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			business: false,
			loading: false,
			followed: false,
			loadingFollow: false,
			style: {
				'.header': {
					background: 'green',
					font: 'yellow'
				}
			}
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		if (!this.state.business || id !== this.props.business.id) {
			this.setState({ loading: true });
			this.props.getBusinessById(id).then((result) => {
				this.setState({ loading: false });

				if (!result.payload.error) this.setState({ business: true });
			});
		}
	}
	followBusiness = (business_id) => {
		this.setState({ loadingFollow: true });
		axios
			.put(`${API}/business/follow`, { business_id: business_id })
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({ loadingFollow: false });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	unfollowBusiness = (business_id) => {
		this.setState({ loadingFollow: true });
		axios
			.put(`${API}/business/unfollow`, { business_id: business_id })
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				this.setState({ loadingFollow: false });
			})
			.catch((err) => {
				console.log(err);
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
		return (
			<section className="mt-5">
				{/* <style>{stringStyle}</style> */}
				{!this.state.loading && this.state.business ? (
					<div className="container">
						<div className="row">
							<div className="col-12 header">
								<div className="row">
									<div className="col-2">
										<img
											className="img-fluid rounded-circle"
											src="https://www.w3schools.com/w3images/avatar2.png"
											alt=""
										/>
									</div>
									<div className="col-8 offset-md-1">
										<div className="row">
											<div className="title-container col-12  ">
												<h1 className="h3 title">{business.profile.name}</h1>
												<div>
													<span>
														{!business.isFollower ? (
															<button
																className=" btn btn-sm btn-primary"
																onClick={() => this.followBusiness(business._id)}
															>
																follow
															</button>
														) : (
															<button
																className="btn btn-sm btn-secondary"
																onClick={() => this.unfollowBusiness(business._id)}
															>
																following
															</button>
														)}
													</span>
												</div>
											</div>
										</div>

										<p>
											<span className="mr-2 follower">
												<strong>{business.followers} </strong>followers
											</span>
											<span className="mx-2">
												<a href="#">
													<strong>200 </strong>review
												</a>
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
										<p>
											Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio sunt veniam
											libero ut iste? Inventore, aspernatur aut repellendus corporis voluptas
											consequatur, dicta quibusdam nesciunt explicabo porro similique sunt
											architecto reprehenderit.
										</p>
										<NavLink
											to={'/business/new-appointment/' + this.props.business._id}
											className="btn btn-sm btn-primary"
											// businessValues={this.state}
										>
											new appointment
										</NavLink>
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
	getBusinessById: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	business: state.business.business
});
export default connect(mapStatetoProps, { getBusinessById })(ClientView);
