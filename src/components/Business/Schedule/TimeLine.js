import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//icons
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { getCurrentDate, getDay } from '../../../utils/date';

class TimeLine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
			pickDate: false
		};
		this.pickDate = this.pickDate.bind(this);
	}
	componentDidMount() {
		const date = getCurrentDate('-');
		const day = getDay(date);
		this.setState({ date });
	}
	pickDate = (e) => {
		this.setState({ date: e.target.value });
	};
	// getTimeLineHeader
	render() {
		return (
			<div className="timeLine card">
				<div className="card-header">
					<h3 className="card-title text-uppercase">Appointments Timeline</h3>
					<div className="card-options">
						<form action="">
							<div className="input-group">
								<div className="input-group-prepend">
									<span className="input-group-text" id="inputGroupPrepend">
										<FaCalendarAlt />
									</span>
								</div>
								<input
									type="date"
									value={this.state.date}
									onChange={this.pickDate}
									className="form-control"
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="card-body">
					<div className="timeLine-header d-flex flex-column flex-md-row justify-content-between">
						<span>09:00</span>
						<span>10:00</span>
						<span>11:00</span>
						<span>12:00</span>
						<span>13:00</span>
						<span>14:00</span>
						<span>15:00</span>
						<span>16:00</span>
						<span>17:00</span>
						<span>18:00</span>
					</div>
					<div className="timeLine-events d-flex flex-column flex-md-row">
						<div className="event">
							<span className="d-block text-center">Adham Khalilieh</span>
							<span className="d-block text-center">9:00 - 11:00</span>
							<hr />
							<span className="d-block text-center">haircut</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

TimeLine.propTypes = {
	myBusiness: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	myBusiness: state.business.myBusiness
});
export default connect(mapStatetoProps, {})(TimeLine);
