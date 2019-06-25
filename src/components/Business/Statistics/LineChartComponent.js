import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';
const calculatePercentage = (current, past) => {
	if (past == 0) return current * 100;
	// if (current == 0) return past * -100;

	return (current / past - 1) * 100;
};
export default class LineChartComponent extends Component {
	render() {
		const { title } = this.props;
		let data = [ [ '', `${title}` ] ];
		data.push(...this.props.children);
		const value = calculatePercentage(this.props.total, this.props.past);
		return (
			<div className="Chart-Container pt-2">
				<div className="row">
					<div className="col-12 chart-header mb-3">
						<h6 className="mb-0">{title}</h6>
						<small className="text-muted">
							<span>13 June - 19 June</span>
						</small>
					</div>
					<div className="col-12 chart-middle">
						<h6 className="mb-0">{this.props.total}</h6>
						<small className="text-muted">
							<span>Total Page View:</span>
						</small>
						<span className={`${value >= 0 ? 'value-up' : 'value-down'}`}>{`${value}%`}</span>
					</div>
					<div className="col-12 mb-2">
						<Chart
							width={'100%'}
							height={'150px'}
							chartType="AreaChart"
							loader={
								<div className="row justify-content-center align-items-center">
									<div className="col-2 mx-auto">
										<img className="img-fluid" src={process.env.PUBLIC_URL + '/loading.gif'} />
									</div>
								</div>
							}
							data={data}
							options={{
								hAxis     : { textPosition: 'none' },
								vAxis     : {
									textPosition : 'none',
									gridlines    : {
										color : 'transparent'
									}
								},

								pointSize : 4,
								chartArea : { width: '90%', height: '95%' },

								// vAxis  : { minValue: 1 },
								legend    : { position: 'none' },
								animation : {
									startup  : true,
									easing   : 'linear',
									duration : 500
								}
							}}
						/>
					</div>
				</div>
			</div>
		);
	}
}
