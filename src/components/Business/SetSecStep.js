import React, { Component } from 'react';

export default class SetSecStep extends Component {
	render() {
		//console.log(this.props);
		const { values } = this.props;
		console.log(values);
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Set Appointment </div>
							<div className="card-body">
								Step 2
								<div className="col-12">{<p className="my-3">You have choosed</p>}</div>
							</div>
							<div className="card-footer">
								<button className="btn btn-sm btn-secondary" onClick={this.props.prevStep}>
									previous
								</button>

								<button className="btn btn-sm btn-primary float-right" onClick={this.props.nextStep}>
									Next
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
