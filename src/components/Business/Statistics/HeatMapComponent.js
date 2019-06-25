import React, { Component } from 'react';

import Chart from 'react-apexcharts';

// function generateData(count, yrange) {
// 	var i = 0;
// 	var series = [];
// 	while (i < 7) {
// 		var x = 'w' + (i + 1).toString();
// 		var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

// 		series.push({
// 			x : x,
// 			y : y
// 		});
// 		i++;
// 	}
// 	return series;
// }

export default class HeatmapChart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			options : {
				chart      : {
					toolbar : { show: false }
				},
				dataLabels : {
					enabled : false
				},
				colors     : [ '#008FFB' ]
			}
		};
	}

	render() {
		return <Chart options={this.state.options} series={this.props.data} type="heatmap" height="460" width="100%" />;
	}
}
