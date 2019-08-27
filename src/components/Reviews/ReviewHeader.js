import React, { Component } from 'react';
import moment from 'moment';

export default class ReviewHeader extends Component {
	render() {
		const appointment = this.props.children;
		return (
			<tr className="bg-light">
				<td className="pb-1">
					<p className="m-0">
						<span className="d-block w-100">
							<strong>Should Start:</strong>
						</span>

						<span className="d-block w-100 text-muted">
							{` ${moment(appointment.date)
								.set({
									hour   : appointment.start._hour,
									minute : appointment.start._minute
								})
								.format('dddd, D. MMMM YYYY  HH:MM')} `}
						</span>
					</p>
				</td>
				<td className="pb-1">
					<p className="m-0">
						<span className="d-block w-100">
							<strong>Started:</strong>
						</span>

						<span className="d-block w-100 text-muted">
							{` ${moment(appointment.check_in).format('HH:MM')} `}
						</span>
					</p>
				</td>
				<td className="pb-1">
					<p className="m-0">
						<span className="d-block w-100">
							<strong>Should End:</strong>
						</span>

						<span className="d-block w-100 text-muted">
							{` ${moment()
								.set({
									hour   : appointment.end._hour,
									minute : appointment.end._minute
								})
								.format('HH:MM')} `}
						</span>
					</p>
				</td>
				<td className="pb-1">
					<p className="m-0">
						<span className="d-block w-100">
							<strong>Ended:</strong>
						</span>

						<span className="d-block w-100 text-muted">
							{` ${moment(appointment.check_out).format('HH:MM')} `}
						</span>
					</p>
				</td>
			</tr>
		);
	}
}
