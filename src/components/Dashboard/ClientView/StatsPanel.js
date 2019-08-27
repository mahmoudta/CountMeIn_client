import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
// react plugin for creating vector maps
import PropTypes from 'prop-types';

import { VectorMap } from 'react-jvectormap';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';
import Place from '@material-ui/icons/Place';
import ArtTrack from '@material-ui/icons/ArtTrack';
import Language from '@material-ui/icons/Language';
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/core components

import '../../Interface/_plugin-react-chartist.scss';
import CardFooter from '../../Interface/Card/CardFooter.jsx';
import Tooltip from '@material-ui/core/Tooltip';
import GridContainer from '../../Interface/Grid/GridContainer.jsx';
import GridItem from '../../Interface/Grid/GridItem.jsx';
import Card from '../../Interface/Card/Card.jsx';
import CardBody from '../../Interface/Card/CardBody.jsx';
import CardHeader from '../../Interface/Card/CardHeader.jsx';
import Button from '../../Interface/CustomButtons/Button';
import dashboardStyle from '../../Interface/Assets/dashboardStyle';

import { dailySalesChart, emailsSubscriptionChart, completedTasksChart } from '../../Interface/variables/charts';

export class StatsPanel extends Component {
	render() {
		const { classes } = this.props;

		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart className={classes.cardHover}>
						<CardHeader color="info" className={classes.cardHeaderHover}>
							<ChartistGraph
								className="ct-chart-white-colors"
								data={dailySalesChart.data}
								type="Line"
								options={dailySalesChart.options}
								listener={dailySalesChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<div className={classes.cardHoverUnder}>
								<Tooltip
									id="tooltip-top"
									title="Refresh"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button simple color="info" justIcon>
										<Refresh className={classes.underChartIcons} />
									</Button>
								</Tooltip>
								<Tooltip
									id="tooltip-top"
									title="Change Date"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button color="transparent" simple justIcon>
										<Edit className={classes.underChartIcons} />
									</Button>
								</Tooltip>
							</div>
							<h4 className={classes.cardTitle}>Daily Appointments</h4>
							<p className={classes.cardCategory}>
								<span className={classes.successText}>
									<ArrowUpward className={classes.upArrowCardCategory} /> 55%
								</span>{' '}
								increase in today Appointments count.
							</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> updated 4 minutes ago
							</div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart className={classes.cardHover}>
						<CardHeader color="warning" className={classes.cardHeaderHover}>
							<ChartistGraph
								className="ct-chart-white-colors"
								data={emailsSubscriptionChart.data}
								type="Bar"
								options={emailsSubscriptionChart.options}
								responsiveOptions={emailsSubscriptionChart.responsiveOptions}
								listener={emailsSubscriptionChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<div className={classes.cardHoverUnder}>
								<Tooltip
									id="tooltip-top"
									title="Refresh"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button simple color="info" justIcon>
										<Refresh className={classes.underChartIcons} />
									</Button>
								</Tooltip>
								<Tooltip
									id="tooltip-top"
									title="Change Date"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button color="transparent" simple justIcon>
										<Edit className={classes.underChartIcons} />
									</Button>
								</Tooltip>
							</div>
							<h4 className={classes.cardTitle}>Daily Experience</h4>
							<p className={classes.cardCategory}>Experience in messured by your behavior</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> campaign sent 2 days ago
							</div>
						</CardFooter>
					</Card>
				</GridItem>
				<GridItem xs={12} sm={12} md={4}>
					<Card chart className={classes.cardHover}>
						<CardHeader color="danger" className={classes.cardHeaderHover}>
							<ChartistGraph
								className="ct-chart-white-colors"
								data={completedTasksChart.data}
								type="Line"
								options={completedTasksChart.options}
								listener={completedTasksChart.animation}
							/>
						</CardHeader>
						<CardBody>
							<div className={classes.cardHoverUnder}>
								<Tooltip
									id="tooltip-top"
									title="Refresh"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button simple color="info" justIcon>
										<Refresh className={classes.underChartIcons} />
									</Button>
								</Tooltip>
								<Tooltip
									id="tooltip-top"
									title="Change Date"
									placement="bottom"
									classes={{ tooltip: classes.tooltip }}
								>
									<Button color="transparent" simple justIcon>
										<Edit className={classes.underChartIcons} />
									</Button>
								</Tooltip>
							</div>
							<h4 className={classes.cardTitle}>Canceled Appointments</h4>
							<p className={classes.cardCategory}>This chart shows how much you waited</p>
						</CardBody>
						<CardFooter chart>
							<div className={classes.stats}>
								<AccessTime /> campaign sent 2 days ago
							</div>
						</CardFooter>
					</Card>
				</GridItem>
			</GridContainer>
		);
	}
}
StatsPanel.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(dashboardStyle)(StatsPanel);
