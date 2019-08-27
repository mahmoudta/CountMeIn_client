import React, { Component } from 'react';

export class SetSmartSecStep extends Component {
	render() {
		const { values } = this.props;
		return (
			<section className="mt-5">
				<div className="container">
					<div className="col-12 col-lg-8 mx-auto">
						<div className="card">
							<div className="card-header text-uppercase">Smart Schedule </div>
							<div className="card-body">
								<form>
									<div className="row">
										<small className="mb-2 mx-auto">I Prefer Appointment in the </small>
										<div className="col-12">
											<button
												type="button"
												className="btn btn-secondary  d-block w-75 mx-auto"
												onClick={this.props.getSmart}
												timeScope={0}
											>
												Morning
											</button>
										</div>
										<div className="col-12">
											<button
												type="button"
												className="btn btn-secondary d-block w-75 mx-auto"
												onClick={this.props.getSmart}
												timeScope={1}
											>
												Afternoon
											</button>
										</div>
										<div className="col-12">
											<button
												type="button"
												className="btn btn-secondary  d-block w-75 mx-auto"
												onClick={this.props.getSmart}
												timeScope={2}
											>
												Evening
											</button>
										</div>
									</div>
								</form>
								<div className="col-12">{<p className="my-3" />}</div>
							</div>
							<div className="card-footer" />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default SetSmartSecStep;
