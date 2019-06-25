import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

export default class DiffAreaComponent extends Component {
	render() {
		return (
			<Chart
				width={'100%'}
				height={'300px'}
				chartType="AreaChart"
				loader={<div>Loading Chart</div>}
				data={[ [ '', 'Follow', 'UnFollow' ], ...this.props.data ]}
				options={{
					title     : 'Company Performance',
					hAxis     : {
						title            : 'Year',
						titleTextStyle   : { color: '#fff' },
						slantedText      : false,
						slantedTextAngle : 0
					},
					// vAxis     : {
					// 	viewWindowMode : 'explicit'
					// },
					// For the legend to fit, we make the chart area smaller
					chartArea : { width: '90%', height: '70%' },
					legend    : {
						position : 'top'
					},
					animation : {
						startup  : true,
						easing   : 'linear',
						duration : 500
					}
					// lineWidth: 25
				}}
			/>
		);
	}
}
