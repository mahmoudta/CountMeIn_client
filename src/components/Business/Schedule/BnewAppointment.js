import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { API } from '../../../consts';
import Swal from 'sweetalert2';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { getBusinessByOwner } from '../../../actions/businessActions';

import isEmpty from 'lodash.isempty';

class BnewAppointment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments_loading: false,
			authirized: true,
			client: '',
			services: [],
			today: '',
			date_from: '',
			date_until: '',
			time: '',
			loading_freetime: false,
			dates: []
		};
	}
	componentDidMount() {
		this.props.getBusinessByOwner(this.props.auth.user.sub).then((res) => {
			if (this.props.myBusiness.owner_id !== this.props.auth.user.sub) {
				this.setState({ authirized: false });
			}
		});
	}

	render() {
		const { myBusiness } = this.props;
		let services = [];
		let customers = [];
		if (!isEmpty(myBusiness)) {
			services = myBusiness.services
				.map((service) => {
					return {
						label: service.service_id.title,
						value: service.service_id._id
					};
				}, [])
				.sort((a, b) => (a.label !== b.label ? (a.label < b.label ? -1 : 1) : 0));

			customers = myBusiness.customers.map((customer) => {
				return {
					label: `${customer.customer_id.profile.name.first} ${customer.customer_id.profile.name.last}`,
					value: customer.customer_id._id
				};
			}, []);
		}

		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-md-10 mx-auto card border-0 shadow">
						<div className="card-header">
							<h3 className="card-title text-center">New Appointment</h3>
						</div>
						<div className="card-body">
							<form action="">
								<div className="row">
									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label" htmlFor="cellular">
												your customers
												<span className="form-required" />
											</label>
											<Select
												options={customers}
												// value={values.services}
												isMulti={false}
												name="services"
												components={makeAnimated()}
												closeMenuOnSelect={true}
												onChange={this.props.handleServices}
											/>
										</div>
									</div>

									<div className="col-md-4">
										<div className="form-group">
											<label className="form-label" htmlFor="">
												services
												<span className="form-required" />
											</label>
											<Select
												options={services}
												// value={values.services}
												isMulti
												name="services"
												components={makeAnimated()}
												closeMenuOnSelect={false}
												onChange={this.props.handleServices}
											/>
											{/* <select
												className="form-control"
												name="services"
												onChange={this.handleChange}
											>
												<option value="-1">choose services</option>

												<option key={'service._id'} value={'service._id'}>
													{'service.sub'}
												</option>
											</select> */}
											<small className="form-text text-muted">
												you can select more than one service
											</small>
										</div>
									</div>

									{/* <div className="col-12 my-3">
										{this.state.services.length > 0 && <h6>selected services:</h6>}
										<div className="col-md-4">
											<div className="row">
												<div key={'i + service + i'} className="col-12 clearfix">
													<span>{'service'}</span>
													<button
														value={'service'}
														className="float-right btn btn-sm btn-secondary border-0"
													>
														<FaTimes />
													</button>
												</div>
											</div>
										</div>
									</div> */}
									<div className="col-12">
										<button
											type="submit"
											onClick={this.fetchFreeTime}
											className="btn btn-sm btn-primary"
										>
											save
										</button>
										<button to="/dashboard" className="btn btn-secondary ml-auto float-right">
											{/* <FaArrowLeft />  */}
											back
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

BnewAppointment.propTypes = {
	auth: PropTypes.object.isRequired,
	myBusiness: PropTypes.object.isRequired,
	getBusinessByOwner: PropTypes.func.isRequired
	// customers: PropTypes.array.isRequired,
	// services: PropTypes.array.isRequired
};
BnewAppointment.contextTypes = {
	router: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	auth: state.auth,
	myBusiness: state.business.myBusiness
	// customers: state.business.customers,
	// services: state.business.businessServices
});
export default connect(mapStatetoProps, { getBusinessByOwner })(BnewAppointment);
