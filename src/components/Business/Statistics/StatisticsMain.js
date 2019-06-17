import React, { Component } from 'react';
import LineChartComponent from './LineChartComponent';

export default class StatisticsMain extends Component {
	render() {
		return (
			<section className="my-5">
				<div className="container">
					<div className="col-12 bg-white py-5">
						<h6>Business Summary</h6>
						<div className="row">
							<div className="col-12 col-md-6 col-lg-4 border-right">
								<LineChartComponent />
							</div>
							<div className="col-12 col-md-6 col-lg-4 border-right">
								<LineChartComponent />
							</div>
							<div className="col-12 col-md-6 col-lg-4 ">
								<LineChartComponent />
							</div>
							<div className="col-12 col-md-6 col-lg-4 border-right border-top">
								<LineChartComponent />
							</div>
							<div className="col-12 col-md-6 col-lg-4 border-right border-top">
								<LineChartComponent />
							</div>
							<div className="col-12 col-md-6 col-lg-4 border-top">
								<LineChartComponent />
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
