import React, { Component } from 'react';

import Card from '../../Interface/Card/Card.jsx';
import GridItem from '../../Interface/Grid/GridItem.jsx';
import CardHeader from '../../Interface/Card/CardHeader.jsx';
import CardFooter from '../../Interface/Card/CardFooter.jsx';
import dashboardStyle from '../../Interface/Assets/dashboardStyle';
import axios from 'axios';
import { API } from '../../../consts';
import { B_IMAGES } from '../../../consts';
import { Link } from 'react-router-dom';

import Phone from '@material-ui/icons/Phone';
import Icon from '@material-ui/core/Icon';

import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
class BusinessList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			business : {
				_id     : null,
				profile : {
					name : 'loading'
				}
			}
		};
	}

	unfollowBusiness = (business_id) => {
		this.props.loading(true);
		axios
			.put(`${API}/business/unfollow`, { business_id: business_id })
			.then((data) => {
				this.props.getData();
				this.props.loading(false);
			})
			.catch((err) => {
				this.props.getData();
				this.props.loading(false);
				console.log(err);
			});
	};

	render() {
		const { classes } = this.props;
		const businesses = this.props.business;
		const imgLink = `${B_IMAGES}/${businesses.profile.img}`;

		return (
			<GridItem xs={12} sm={6} md={6} lg={3}>
				<Card>
					<CardHeader color="success" stats icon>
						<img src={imgLink} alt={businesses.profile.name} className={classes.iconaa} />

						<Link to={`/business/view/${businesses._id}`}>
							<p className={classes.cardCategory}>Visit Business</p>
						</Link>
						<h5 className={classes.cardTitle}>{businesses.profile.name}</h5>
					</CardHeader>
					<CardFooter stats>
						<div className={classes.stats}>
							<Phone />
							{businesses.profile.phone}
						</div>
						<div>
							<Link to={`/business/new-appointment/${businesses._id}`}>
								<Icon color="disabled">alarm_add</Icon>
							</Link>
							<Link
								to={`#`}
								onClick={(e) => {
									e.preventDefault();
									this.unfollowBusiness(businesses._id);
								}}
							>
								<Icon color="disabled">person_add_disabled</Icon>
							</Link>
						</div>
					</CardFooter>
				</Card>
			</GridItem>
		);
	}
}
BusinessList.propTypes = {
	classes : PropTypes.object.isRequired
};
export default withStyles(dashboardStyle)(BusinessList);
