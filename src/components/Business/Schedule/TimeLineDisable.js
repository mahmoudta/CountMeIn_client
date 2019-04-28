// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// //icons
// import { FaCalendarAlt } from 'react-icons/fa';
// import { FaArrowRight } from 'react-icons/fa';
// import { FaArrowLeft } from 'react-icons/fa';
// import { getCurrentDate, getDay } from '../../../utils/date';

// class TimeLine extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			date: '',
// 			pickDate: false
// 		};
// 		this.pickDate = this.pickDate.bind(this);
// 	}
// 	componentDidMount() {
// 		const date = getCurrentDate('-');
// 		console.log(date);
// 		const day = getDay(date);
// 		console.log(day);
// 		this.setState({ date });
// 	}
// 	pickDate = (e) => {
// 		this.setState({ date: e.target.value });
// 	};
// 	// getTimeLineHeader
// 	render() {
// 		return (
// 			<section>
// 				<div className="container">
// 					<div className="timeLine card">
// 						<div className="card-header">
// 							<h3 className="card-title text-uppercase">Appointments Timeline</h3>
// 							<div className="card-options">
// 								<form action="">
// 									<div className="input-group">
// 										<div className="input-group-prepend">
// 											<span className="input-group-text" id="inputGroupPrepend">
// 												<FaCalendarAlt />
// 											</span>
// 										</div>
// 										<input
// 											type="date"
// 											value={this.state.date}
// 											onChange={this.pickDate}
// 											className="form-control"
// 										/>
// 									</div>
// 								</form>
// 							</div>
// 						</div>
// 						<div className="table-responsive ">
// 							<table className="table card-table mb-0 table-vcenter text-nowrap listTable ">
// 								<thead>
// 									{/* {this.getTimeLineHeader()} */}
// 									<tr>
// 										<th />

// 										<th>9:00</th>
// 										<th>10:00</th>
// 										<th>11:00</th>
// 										<th>12:00</th>
// 										<th>13:00</th>
// 										<th>14:00</th>
// 										<th>15:00</th>
// 										<th>16:00</th>
// 										<th>17:00</th>
// 										<th>18:00</th>
// 									</tr>
// 								</thead>
// 								<tbody>
// 									<tr>
// 										<td>Appointments</td>
// 										<td className="table-success event rounded" colSpan="2">
// 											<div className="">
// 												<span className="d-block text-center">Adham Khalilieh</span>
// 												<span className="d-block text-center">9:00 - 11:00</span>
// 												<hr />
// 												<span className="d-block text-center">haircut</span>
// 											</div>
// 										</td>
// 									</tr>
// 									<tr>
// 										<td>Break</td>
// 									</tr>
// 								</tbody>
// 							</table>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		);
// 	}
// }

// TimeLine.propTypes = {
// 	myBusiness: PropTypes.object.isRequired
// };
// const mapStatetoProps = (state) => ({
// 	myBusiness: state.business.myBusiness
// });
// export default connect(mapStatetoProps, {})(TimeLine);
