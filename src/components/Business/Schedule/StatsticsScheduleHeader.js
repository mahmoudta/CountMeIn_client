import React, { Component } from 'react';

/* */

export default class StatsticsScheduleHeader extends Component {
	render() {
		return (
			<section key={'StatisticsHeader'}>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-6 col-lg-3 mb-md-4">
							<div className="card border-left-primary shadow py-2">
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
												Earnings (Monthly)
											</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
										</div>
									</div>
								</div>
							</div>
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
