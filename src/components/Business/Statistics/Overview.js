import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isEmpty from 'lodash.isempty';

import LineChartComponent from './LineChartComponent';
import NoData from './NoData';

class Overview extends Component {
	componentDidMount() {}
	render() {
		const stats = this.props.global;
		return (
			<div>
				{!this.props.loading ? (
					<div className="row">
						<div className="col-12 col-md-6 col-lg-4 border-right bg-white">
							{!isEmpty(stats) && !isEmpty(stats.past) ? (
								<LineChartComponent
									title="Average rate"
									total={(stats.current.Faverage_rate / 7).toFixed(2)}
									past={(stats.past.rating_sum /
										(stats.past.rating_count > 0 ? stats.past.rating_count : 1) /
										7).toFixed(2)}
									printRange={this.props.printRange}
								>
									{stats.current.average_rate ? stats.current.average_rate : []}
								</LineChartComponent>
							) : (
								<NoData />
							)}
						</div>
						<div className="col-12 col-md-6 col-lg-4 border-right bg-white">
							{!isEmpty(stats) && !isEmpty(stats.past) ? (
								<LineChartComponent
									title="Success apoointments"
									total={stats.current.Fdone_appointments}
									past={stats.past.done_appointments}
									printRange={this.props.printRange}
								>
									{stats.current.done_appointments ? stats.current.done_appointments : []}
								</LineChartComponent>
							) : (
								<NoData />
							)}
						</div>
						<div className="col-12 col-md-6 col-lg-4  bg-white">
							{!isEmpty(stats) && !isEmpty(stats.past) ? (
								<LineChartComponent
									title="Profile views"
									total={stats.current.Fprofile_views}
									past={stats.past.profile_views}
									printRange={this.props.printRange}
								>
									{stats.current.profile_views ? stats.current.profile_views : []}
								</LineChartComponent>
							) : (
								<NoData />
							)}
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

Overview.propTypes = {
	user   : PropTypes.object.isRequired,
	global : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	user    : state.auth.user,
	global  : state.statistics.global,
	loading : state.statistics.loading
});

export default connect(mapStatetoProps, {})(Overview);
