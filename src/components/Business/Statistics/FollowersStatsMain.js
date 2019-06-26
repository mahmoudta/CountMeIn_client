import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import DiffAreaComponent from './DiffAreaComponent';

class FollowersStatsMain extends Component {
	render() {
		return (
			<div>
				{!this.props.loading ? (
					<div className="row">
						<div className="col-12 col-lg-10 bg-white">
							<DiffAreaComponent
								data={this.props.followersStats.map((elem) => {
									return [
										moment(elem.graph[0]).format('DD MMM'),
										elem.graph[1],
										elem.graph[2] * -1
									];
								})}
							/>
						</div>
						<div className="d-none d-lg-block col-lg-2 border-left bg-white">
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus necessitatibus dicta,
								doloremque accusantium quod eius, corrupti placeat nisi tempore quam sunt sequi?
								Exercitationem fuga tenetur quae ipsam amet magni tempore.
							</p>
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

FollowersStatsMain.propTypes = {
	user           : PropTypes.object.isRequired,
	followersStats : PropTypes.array.isRequired
};
const mapStatetoProps = (state) => ({
	user           : state.auth.user,
	followersStats : state.statistics.followersStats,
	loading        : state.statistics.loading
});

export default connect(mapStatetoProps, {})(FollowersStatsMain);
