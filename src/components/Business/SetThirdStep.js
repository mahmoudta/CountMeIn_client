import React, { Component } from 'react';
// import isEmpty from 'lodash/isEmpty';
import { zeroPad } from '../../utils/padding';
export default class SetThirdStep extends Component {
	render() {
		const { values } = this.props;
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Set Appointment </div>
							<div className="card-body">
								<small className="mb-2">Step 3</small> <br />
								<div className="row">
									{values.dates.dates.map((dates) => {
										return (
											<div className="col">
												<div className="btn-group-vertical">
													{(new Date(dates.Date) + ' ').slice(0, 15)}
													{dates.Free.map((free, i) => {
														return (
															<button
																type="button"
																className="btn btn-secondary"
																onClick={this.props.setAppointment}
																date={dates.Date}
																shour={free._start._hour}
																sminute={free._start._minute}
																ehour={free._end._hour}
																emminute={free._end._minute}
															>
																{free._start._hour}:
																{zeroPad(free._start._minute, 2)}
																{' - '}
																{free._end._hour}:
																{zeroPad(free._end._minute, 2)}
															</button>
														);
													})}
												</div>
											</div>
										);
									})}
								</div>
								<div className="col-12">{<p className="my-3">You have choosed</p>}</div>
							</div>
							<div className="card-footer" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}
