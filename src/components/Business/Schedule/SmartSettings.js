import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBusinessByOwner, UpdateSmartAlgorithmsSettings } from '../../../actions/businessActions';

class SmartSettings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customers_exp             : true,
			days_calculate_length     : 0,
			max_working_days_response : 0,
			distrbuted_time           : 1,
			continuity                : 0
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
					continuity                : settings.continuity
				});
			}
		});
	}
	render() {
		return (
			<section className="my-5">
				<div className="container">
					<div className="row">
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
										<div className="col-12 col-md-6 offset-md-3">
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
												<small class="form-text text-muted">
													Give privilege to to customers with high experince value.
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

												<small class="form-text text-muted">
													Give privilege to to customers with high experince value.
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
													max="10"
													step="0.5"
													className="custom-range"
													value={this.state.distrbuted_time}
													onChange={this.handleChange}
												/>

												<small class="form-text text-muted">
													Give privilege to to customers with high experince value.
												</small>
											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="form-group">
												<label className="form-label" htmlFor="days_calculate_length">
													{`Maximum Days for Bokking - ${this.state.days_calculate_length}`}
												</label>
												<input
													type="range"
													name="days_calculate_length"
													min="0"
													max="10"
													step="0.5"
													className="custom-range"
													value={this.state.days_calculate_length}
													onChange={this.handleChange}
												/>

												<small class="form-text text-muted">
													Give privilege to to customers with high experince value.
												</small>
											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="form-group">
												<label className="form-label" htmlFor="max_working_days_response">
													{` Maxumim response days - ${this.state.max_working_days_response}`}
												</label>
												<input
													type="range"
													name="max_working_days_response"
													min="0"
													max="10"
													step="0.5"
													value={this.state.max_working_days_response}
													onChange={this.handleChange}
													className="custom-range"
												/>

												<small class="form-text text-muted">
													Give privilege to to customers with high experince value.
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
	user       : state.auth.user
});
export default connect(mapStatetoProps, { getBusinessByOwner, UpdateSmartAlgorithmsSettings })(SmartSettings);
