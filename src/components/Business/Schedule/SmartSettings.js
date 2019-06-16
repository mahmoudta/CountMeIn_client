import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBusinessByOwner, UpdateSmartAlgorithmsSettings } from '../../../actions/businessActions';
import Loading from '../../globalComponents/Loading';

class SmartSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers_exp             : true,
			days_calculate_length     : 0,
			max_working_days_response : 0,
			distrbuted_time           : 1,
			continuity                : 0,
			experiance_rule           : 1,
			customer_prefered_period  : 1
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'customers_exp') {
			let edit = this.state.customers_exp;
			this.setState({ [name]: !edit });
			return;
		}
		this.setState({ [name]: value });
		console.log(value);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.UpdateSmartAlgorithmsSettings(this.state);
	};

	componentDidMount() {
		this.props.getBusinessByOwner(this.props.user.sub).then((result) => {
			if (!result.payload.error) {
				const settings = result.payload.schedule_settings;
				this.setState({
					customers_exp             : settings.customers_exp,
					days_calculate_length     : settings.days_calculate_length,
					max_working_days_response : settings.max_working_days_response,
					distrbuted_time           : settings.distrbuted_time,
					continuity                : settings.continuity,
					experiance_rule           : settings.experiance_rule,
					customer_prefered_period  : settings.customer_prefered_period
				});
			}
		});
	}
	render() {
		return (
			<section className="my-5">
				<div className="container">
					<div className="row">
						{!this.props.loading ? (
							<div className="col-10 card border-0 mx-auto rounded bg-white shadow px-md-0 pb-3">
								<div className="card-header border-0 pt-5">
									<h2 className="d-block w-100 text-center">Advanced Scheduling Settings</h2>
								</div>
								<div className="card-body">
									<form className="px-md-5">
										<h4 className="text-center font-weight-light mb-5">
											Smart Algorithms Customaziation
										</h4>
										<div className="row">
											<div className="col-12 col-md-6 ">
												<div className="form-group">
													<label className="form-label">Customer experince</label>

													<div className="custom-control custom-switch">
														<input
															type="checkbox"
															name="customers_exp"
															id="customers_exp"
															className="custom-control-input"
															checked={this.state.customers_exp}
															onChange={this.handleChange}
														/>
														<label className="custom-control-label" htmlFor="customers_exp">
															{this.state.customers_exp ? 'TRUE' : 'FALSE'}
														</label>
													</div>
													<small className="form-text text-muted">
														Give privileges to customers with high experience value.
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="experiance_rule">
														{`experiance rule - ${this.state.experiance_rule}`}
													</label>
													<input
														type="range"
														name="experiance_rule"
														min="1"
														max="5"
														step="1"
														className="custom-range"
														value={this.state.experiance_rule}
														onChange={this.handleChange}
													/>

													<small className="form-text text-muted">
														On a scale from 1 to 5 how much difficult it is to become a high
														level experiance customer .
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="continuity">
														{`Continuity - ${this.state.continuity}`}
													</label>
													<input
														type="range"
														name="continuity"
														min="0"
														max="10"
														step="0.5"
														className="custom-range"
														value={this.state.continuity}
														onChange={this.handleChange}
													/>

													<small className="form-text text-muted">
														On a scale from 0 to 10 how much the business care about the
														continuity of the appointments.
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="distrbuted_time">
														{`Distrbuited Time - ${this.state.distrbuted_time}`}
													</label>
													<input
														type="range"
														name="distrbuted_time"
														min="1"
														max="20"
														step="0.5"
														className="custom-range"
														value={this.state.distrbuted_time}
														onChange={this.handleChange}
													/>

													<small className="form-text text-muted">
														On a scale from 1 to 10 how much the business care about
														distributing the appointments as much as possible equally among
														the working hourse.
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="days_calculate_length">
														{`Maximum Days for Bokking - ${this.state
															.days_calculate_length}`}
													</label>
													<input
														type="range"
														name="days_calculate_length"
														min="2"
														max="30"
														step="1"
														className="custom-range"
														value={this.state.days_calculate_length}
														onChange={this.handleChange}
													/>

													<small className="form-text text-muted">
														How many days in advance the Smart algorithms can book.
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="max_working_days_response">
														{` Maxumim response days - ${this.state
															.max_working_days_response}`}
													</label>
													<input
														type="range"
														name="max_working_days_response"
														min="1"
														max="30"
														step="1"
														value={this.state.max_working_days_response}
														onChange={this.handleChange}
														className="custom-range"
													/>

													<small className="form-text text-muted">
														How many different days the Smart algorithms allow the user to
														choose from.
													</small>
												</div>
											</div>

											<div className="col-12 col-md-6">
												<div className="form-group">
													<label className="form-label" htmlFor="customer_prefered_period">
														{`customer prefered period - ${this.state
															.customer_prefered_period}`}
													</label>
													<input
														type="range"
														name="customer_prefered_period"
														min="1"
														max="9"
														step="0.5"
														className="custom-range"
														value={this.state.customer_prefered_period}
														onChange={this.handleChange}
													/>

													<small className="form-text text-muted">
														On a scale from 1 to 9 how much importantace you want the smart
														algorithm to put on the customer prefered period.
													</small>
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
SmartSettings.propTypes = {
	user                          : PropTypes.object.isRequired,
	myBusiness                    : PropTypes.object.isRequired,
	getBusinessByOwner            : PropTypes.func.isRequired,
	UpdateSmartAlgorithmsSettings : PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	myBusiness : state.business.myBusiness,
	user       : state.auth.user,
	loading    : state.business.loading
});
export default connect(mapStatetoProps, { getBusinessByOwner, UpdateSmartAlgorithmsSettings })(SmartSettings);
