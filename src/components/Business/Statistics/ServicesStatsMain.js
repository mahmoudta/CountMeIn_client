import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ServicesStatsMain extends Component {
	render() {
		return (
			<div className="row bg-white">
				<div className="table-responsive bg-white">
					{!this.props.loading ? (
						<table className="table card-table mb-0 table-vcenter text-nowrap listTable">
							<thead>
								<tr>
									<th>Service</th>
									<th># of Appointments</th>
									<th>Earning</th>
									<th>Time</th>
									<th>Estimated Change</th>
								</tr>
							</thead>
							<tbody>
								{this.props.services.map((service) => {
									return (
										<tr key={service._id}>
											<td>{service.title}</td>
											<td>{service.count}</td>
											<td>{`${service.profit} NIS`}</td>
											<td>{`${service.time} MINS`}</td>
											<td>
												<span
													className={`${service.change >= 0
														? 'value-up text-danger'
														: 'value-down text-success'}`}
												>
													{`${service.change.toFixed(2)} MINS`}
												</span>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
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
			</div>
		);
	}
}

ServicesStatsMain.propTypes = {
	user     : PropTypes.object.isRequired,
	services : PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	user     : state.auth.user,
	services : state.statistics.services,
	loading  : state.statistics.loading
});

export default connect(mapStatetoProps, {})(ServicesStatsMain);
