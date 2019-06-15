import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* */

class StatsticsScheduleHeader extends Component {
	render() {
		const { header } = this.props.statistics;
		return (
			<section key={'StatisticsHeader'}>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-3 mb-md-4">
							{Object.keys(header).map((day) => {
								return (
									<div key={'success' + day} className="card border-left-primary shadow py-2">
										<div className="card-body">
											<div className="row no-gutters align-items-center">
												<div className="col mr-2">
													<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
														success appointments
													</div>
													<div className="h5 mb-0 font-weight-bold text-gray-800">
														{header[day].done} Appointments
													</div>
												</div>
											</div>
										</div>
										<div className="card-footer bg-white">
											<div className="h6 mb-0 font-weight-light text-success">
												{(header[day].done / header[day].total * 100).toFixed(2)} %
											</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-md-4">
							<div className="card border-left-success shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-md-4">
							<div className="card border-left-info shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-6 col-lg-3 mb-md-4">
							<div className="card border-left-warning shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

StatsticsScheduleHeader.propTypes = {
	statistics : PropTypes.object.isRequired
};

const mapStatetoProps = (state) => ({
	statistics : state.statistics
});
export default connect(mapStatetoProps, {})(StatsticsScheduleHeader);
