import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { calculatePercentage } from '../../../utils/date';

import { FaShekelSign, FaBusinessTime, FaCalendarCheck } from 'react-icons/fa';

/* */

class StatsticsScheduleHeader extends Component {
	render() {
		const { header } = this.props.statistics;
		let valWork,
			valApp,
			valEarning = 0;
		return (
			<section key={'StatisticsHeader'}>
				<div className="container">
					<div className="row">
						<div className="col-12 col-lg-4 mb-3">
							<div key={'success'} className="card border-left-primary shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="icon-bg">
											<FaBusinessTime />
										</div>
										<div className="col mr-2">
											<div className="text-sm font-weight-bold text-primary text-uppercase mb-1">
												WORKED HOURS
												<small className="text-muted w-100 d-block">
													<span>{moment().subtract(8, 'days').format('DD MMM')}</span>
													<span>{` - `}</span>
													<span>{moment().subtract(1, 'day').format('DD MMM')}</span>
												</small>
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{header.total_time >= 0 ? (
													<span>{(header.total_time / 60).toFixed(2)}Hrs</span>
												) : (
													<small className="text-muted">insufficient data to show.</small>
												)}
											</div>
										</div>
									</div>
								</div>
								{header.total_time >= 0 && (
									<div className="card-footer bg-white">
										<div
											className={`h6 mb-0 font-weight-light ${(valWork = calculatePercentage(
												header.total_time,
												header.l_total_time
											)) > 0
												? 'value-up'
												: 'value-down'}`}
										>
											{valWork}%
											<small className="text-muted"> compared to previous week</small>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="col-12 col-lg-4 mb-3">
							<div className="card border-left-success shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="icon-bg">
											<FaCalendarCheck />
										</div>
										<div className="col mr-2">
											<div className="text-sm font-weight-bold text-success text-uppercase mb-1">
												DONE APPOINTMENTS
												<small className="text-muted w-100 d-block">
													<span>{moment().subtract(8, 'days').format('DD MMM')}</span>
													<span>{` - `}</span>
													<span>{moment().subtract(1, 'day').format('DD MMM')}</span>
												</small>
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{header.done_appointments >= 0 ? (
													<span>{header.done_appointments}</span>
												) : (
													<small className="text-muted">insufficient data to show.</small>
												)}
											</div>
										</div>
									</div>
								</div>
								{header.done_appointments >= 0 && (
									<div className="card-footer bg-white">
										<div
											className={`h6 mb-0 font-weight-light ${(valApp = calculatePercentage(
												header.done_appointments,
												header.l_done_appointments
											)) > 0
												? 'value-up'
												: 'value-down'}`}
										>
											{valApp}%
											<small className="text-muted"> compared to previous week</small>
										</div>
									</div>
								)}
							</div>
						</div>

						<div className="col-12 col-lg-4 mb-3">
							<div className="card border-left-info shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="icon-bg">
											<FaShekelSign />
										</div>
										<div className="col mr-2">
											<div className="text-sm font-weight-bold text-info text-uppercase mb-1">
												EARNINGS
												<small className="text-muted w-100 d-block">
													<span>{moment().subtract(7, 'days').format('DD MMM')}</span>
													<span>{` - `}</span>
													<span>{moment().subtract(1, 'day').format('DD MMM')}</span>
												</small>
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">
												{header.total_earnings >= 0 ? (
													<span>{header.total_earnings} NIS</span>
												) : (
													<small className="text-muted">insufficient data to show.</small>
												)}
											</div>
										</div>
									</div>
								</div>
								{header.total_earnings >= 0 && (
									<div className="card-footer bg-white">
										<div
											className={`h6 mb-0 font-weight-light ${(valEarning = calculatePercentage(
												header.total_earnings,
												header.l_total_earnings
											)) > 0
												? 'value-up'
												: 'value-down'}`}
										>
											{valEarning}%
											<small className="text-muted"> compared to previous week</small>
										</div>
									</div>
								)}
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
