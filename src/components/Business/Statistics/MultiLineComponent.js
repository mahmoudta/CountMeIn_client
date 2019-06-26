import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Chart from 'react-apexcharts';

const createDates = () => {
	// let now = moment().format('d MMM');
	// let min = moment(now).subtract(8, 'days');
	let arr = [];
	for (var i = 0; i < 7; i++) {
		let date = moment(new Date()).subtract(7 - i, 'days').format('DD MMM');
		arr[i] = date.toString();
	}
	return arr;
};
// Apex = {
// 	dataLabels : {
// 		enabled : false
// 	},
// 	stroke     : {
// 		curve : 'straight'
// 	},
// 	toolbar    : {
// 		tools : {
// 			selection : false
// 		}
// 	},
// 	markers    : {
// 		size  : 6,
// 		hover : {
// 			size : 10
// 		}
// 	},
// 	tooltip    : {
// 		followCursor : false,
// 		theme        : 'dark',
// 		x            : {
// 			show : false
// 		},
// 		marker       : {
// 			show : false
// 		},
// 		y            : {
// 			title : {
// 				formatter : function() {
// 					return '';
// 				}
// 			}
// 		}
// 	},
// 	grid       : {
// 		clipMarkers : false
// 	},
// 	yaxis      : {
// 		tickAmount : 1
// 	},
// 	xaxis      : {
// 		type : 'datetime'
// 	}
// };
export default class MultiLineComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			doneOptions   : {
				chart  : {
					id      : 'done',
					group   : 'appointments_count',
					toolbar : { show: false },
					legend  : {
						show : true
					}
				},
				yaxis  : {
					labels     : {
						minWidth : 1
					},
					tickAmount : 1
				},
				xaxis  : {
					type       : 'datetime',
					categories : createDates()
				},
				colors : [ '#66DA26' ]
			},
			passedOptions : {
				chart  : {
					id      : 'passed',
					group   : 'appointments_count',
					toolbar : { show: false },
					legend  : {
						show : true
					}
				},
				yaxis  : {
					labels     : {
						minWidth : 1
					},
					tickAmount : 1
				},
				xaxis  : {
					type       : 'datetime',
					categories : createDates()
				},

				colors : [ '#dc3545' ]
			},
			totalOptions  : {
				chart  : {
					id      : 'total',
					group   : 'appointments_count',
					toolbar : { show: false },
					legend  : {
						show : true
					}
				},

				yaxis  : {
					labels     : {
						minWidth : 1
					},
					tickAmount : 1
				},
				xaxis  : {
					type       : 'datetime',
					categories : createDates()
				},
				colors : [ '#2E93fA' ]
			}
		};
	}

	render() {
		return (
			<div id="chart">
				<Chart
					options={this.state.doneOptions}
					series={[
						{
							name : 'Done',
							data : this.props.done
						}
					]}
					type="area"
					height="150"
				/>
				<Chart
					options={this.state.passedOptions}
					series={[
						{
							name : 'Passed',
							data : this.props.passed
						}
					]}
					type="area"
					height="150"
				/>
				<Chart
					options={this.state.totalOptions}
					series={[
						{
							name : 'Total',
							data : this.props.total
						}
					]}
					type="area"
					height="150"
				/>
			</div>
		);
	}
}
