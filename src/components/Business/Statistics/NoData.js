import React, { Component } from 'react';

import { FaCalendarAlt } from 'react-icons/fa';

export default class NoData extends Component {
	render() {
		return (
			<div className="continer">
				<div className="row">
					<div className="col-12 mx-auto text-center">
						<p className="display-4 text-muted">
							<FaCalendarAlt />
						</p>
						<p className="text-muted text-center w-100">
							We have insufficient data to show for the this time period.
						</p>
					</div>
				</div>
			</div>
		);
	}
}
