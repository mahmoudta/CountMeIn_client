import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeatmapChart from './HeatMapComponent';
import MultiLineComponent from './MultiLineComponent';

class AppointmentsStatsMain extends Component {
	render() {
		return (
			<div>
				{!this.props.loading ? (
					<div className="row">
						<div className="col-12 bg-white">
							<div className="row">
								<div className="col-12 col-lg-9 ">
									<MultiLineComponent
										done={this.props.comparison.done}
										passed={this.props.comparison.passed}
										total={this.props.comparison.total}
									/>
								</div>
								<div className="d-none d-lg-flex col-lg-3 py-3 align-items-center justify-content-center flex-column">
									<h6 className=" text-success w-75">
										<span
											className="d-inline-block mr-3"
											style={{
												height          : '12px',
												width           : '30px',
												backgroundColor : 'currentColor',
												verticalAlign   : 'bottom'
											}}
										/>
										<span className="text-secondary font-weight-light">DONE</span>
									</h6>

									<h6 className="text-danger w-75">
										<span
											className="d-inline-block mr-3"
											style={{
												height          : '12px',
												width           : '30px',
												backgroundColor : 'currentColor',
												verticalAlign   : 'bottom'
											}}
										/>
										<span className="text-secondary font-weight-light">PASSED</span>
									</h6>

									<h6 className="text-primary w-75">
										<span
											className="d-inline-block mr-3"
											style={{
												height          : '12px',
												width           : '30px',
												backgroundColor : 'currentColor',
												verticalAlign   : 'bottom'
											}}
										/>
										<span className="text-secondary font-weight-light">TOTAL</span>
									</h6>
								</div>
							</div>
						</div>
						<div className="col-12 py-3 my-3">
							<div className="row col-12 col-lg-4 bg-white shadow-sm">
								<h6 className="py-3 text-muted w-100">Appointments by time of day</h6>
								<small className="text-muted">The number of appointments per hours of the day. </small>
								<HeatmapChart data={this.props.traffic} />
							</div>
						</div>
					</div>
				) : (
					<div className="row justofy-content-center bg-white">
						<div className="col-2 mx-auto my-4">
							<img
								className="img-fluid"
								alt="Countmien-Loading"
								src={process.env.PUBLIC_URL + '/loading.gif'}
							/>
						</div>
					</div>
				)}
			</div>
		);
	}
}

AppointmentsStatsMain.propTypes = {
	user       : PropTypes.object.isRequired,
	comparison : PropTypes.object.isRequired,
	traffic    : PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	user       : state.auth.user,
	comparison : state.statistics.comparison,
	traffic    : state.statistics.traffic,
	loading    : state.statistics.loading
});

export default connect(mapStatetoProps, {})(AppointmentsStatsMain);
