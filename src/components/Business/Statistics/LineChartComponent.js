import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class LineChartComponent extends Component {
	render() {
		return (
			<div className="Chart-Container py-4">
				<Chart
					width={'100%'}
					min-height={'215px'}
					height={'215px'}
					chartType="Line"
					loader={<div>Loading Chart</div>}
					data={[
						[ 'Day', 'page views' ],
						[ 1, 37.8 ],
						[ 2, 30.9 ],
						[ 3, 25.4 ],
						[ 4, 11.7 ],
						[ 5, 11.9 ],
						[ 6, 8.8 ],
						[ 7, 7.6 ]
					]}
					options={{
						chart  : {
							title    : 'Box Office Earnings in First Two Weeks of Opening',
							subtitle : 'in millions of dollars (USD)'
						},
						legend : { position: 'none' }
					}}
				/>
			</div>
		);
	}
}
