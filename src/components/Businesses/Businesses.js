import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import { API } from '../../consts';
import { truncateSync } from 'fs';
import BusinessList from '../Dashboard/ClientView/BusinessList';
import GridContainer from '../Interface/Grid/GridContainer';
import { connect } from 'react-redux';
import { getAllCategories } from '../../actions/categoryActions';
import CustomInput from '../Interface/CustomInput/CustomInput.jsx';
import GridItem from '../Interface/Grid/GridItem';

const styles = (theme) => ({
	root        : {
		display  : 'flex',
		flexWrap : 'wrap'
	},
	formControl : {
		margin   : theme.spacing.unit,
		minWidth : '80%',
		maxWidth : '100%'
	},
	chips       : {
		display  : 'flex',
		flexWrap : 'wrap'
	},
	chip        : {
		margin : theme.spacing.unit / 4
	},
	noLabel     : {
		marginTop : theme.spacing.unit * 3
	},
	select      : {
		'&:before' : {
			//borderColor: color,
		},
		'&:after'  : {
			borderColor : '#353A40'
		}
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps : {
		style : {
			maxHeight : ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width     : 250
		}
	}
};

function getStyles(name, that) {
	return {
		fontWeight :
			that.state.name.indexOf(name) === -1
				? that.props.theme.typography.fontWeightRegular
				: that.props.theme.typography.fontWeightMedium
	};
}

class Businesses extends Component {
	state = {
		name               : [],
		value              : [],
		names              : [],
		values             : [],
		businesses         : [],
		allBusinesses      : [],
		search             : '',
		filteredBusinesses : [],
		catCount           : 0
	};

	componentWillMount() {
		axios
			.get(`${API}/business/getAllbusinesses`)
			.then((response) => {
				//	this.setState({ dates: response.data });
				response.data.businesses.map((businessProfile) => {
					this.setState({
						allBusinesses : [ ...this.state.allBusinesses, { Name: 'all', businessProfile } ]
					});
				});
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				//this.setState({ filteredBusinesses: this.state.allBusinesses })
			});
		//get all catagories names and ids
		this.props.getAllCategories();
	}
	SearchBusinesses = (item) => {
		const Name = item.title;
		this.setState({ catCount: this.state.catCount + 1 });
		axios
			.get(`${API}/business/getBusinessesByCatagory/${item.values}`)
			.then((response) => {
				//	this.setState({ dates: response.data });
				//const tmpaa = response.data.business.filter(business_ => business_.profile.name.toLowerCase().includes(this.state.search))
				response.data.business.map((businessProfile) => {
					this.setState({
						businesses : [ ...this.state.businesses, { Name, businessProfile } ]
					});
				});
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => {
				if (this.state.search.length != 0) {
					const tmp = this.state.businesses.filter((business) =>
						business.businessProfile.profile.name.toLowerCase().includes(this.state.search)
					);
					this.setState({ filteredBusinesses: tmp });
				} else {
					this.setState({ filteredBusinesses: this.state.businesses });
				}
			});
	};

	searchChange = (event, num) => {
		var LowerSearch;
		if (num === 0) {
			LowerSearch = event.target.value.toLowerCase();
			this.setState({ search: LowerSearch });
		}
		if (num === 1) {
			LowerSearch = this.state.search;
			//this.setState({ search: LowerSearch })
		}
		if (this.state.catCount === 0) {
			if (LowerSearch === '') {
				this.setState({ filteredBusinesses: [] });
			}
			const tmpS = this.state.allBusinesses.filter((business) =>
				business.businessProfile.profile.name.toLowerCase().includes(this.state.search)
			);
			this.setState({ filteredBusinesses: tmpS });
		} else {
			const tmpS = this.state.businesses.filter((business) =>
				business.businessProfile.profile.name.toLowerCase().includes(this.state.search)
			);
			this.setState({ filteredBusinesses: tmpS });
		}
		if (LowerSearch === '') {
			if (this.state.catCount === 0) this.setState({ filteredBusinesses: [] });
			if (this.state.catCount > 0) {
				this.setState({ filteredBusinesses: this.state.businesses });
			}
		}
		// console.log(this.state.filteredBusinesses, 'FILTERED');
	};

	handleChange = (event) => {
		const item = event.target.value;
		const index = this.state.value.indexOf(item[item.length - 1].values);
		if (index === -1) {
			// const item = event.target.attributes.getNamedItem("title").value;
			//console.log("item", item);
			const thisItem = item[item.length - 1];
			this.SearchBusinesses(thisItem);
			this.setState({
				name  : [ ...this.state.name, thisItem.title ],
				value : [ ...this.state.value, thisItem.values ]
			});
			return;
		}
		if (index > -1) {
			this.setState({ catCount: this.state.catCount - 1 });
			const arrayfilter = this.state.businesses.filter((xwx) => {
				return xwx.Name != this.state.name[index];
			});

			const arrayfilter2 = this.state.filteredBusinesses.filter((xwx) => {
				return xwx.Name != 'all';
			});
			this.setState({
				businesses : arrayfilter
			});
			this.setState({
				filteredBusinesses : arrayfilter2
			});
			this.searchChange(null, 1);

			const tmpvalue = this.state.value;
			tmpvalue.splice(index, 1);
			const tmpname = this.state.name;
			tmpname.splice(index, 1);
			this.setState({ value: tmpvalue, name: tmpname });
			// this.state.value.splice(index, 1);
			// this.state.name.splice(index, 1);
		}
		//console.log(event.target.selectedOptions[0].getAttributes("title"));
	};

	render() {
		const { classes } = this.props;
		const { categoriess } = this.props;
		// console.log('state array', this.state.businesses);
		// const distinctArray = [
		//   ...new Set(this.state.businesses.map(item => item.businessProfile._id))
		// ];

		var flags = [],
			output = [],
			l = this.state.filteredBusinesses.length,
			i;
		for (i = 0; i < l; i++) {
			if (flags[this.state.filteredBusinesses[i].businessProfile._id]) continue;
			flags[this.state.filteredBusinesses[i].businessProfile._id] = true;
			output.push(this.state.filteredBusinesses[i]);
		}

		// console.log('distinct', flags);
		const PrintIt = output.map((i) => {
			return <BusinessList key={i + 22} business={i.businessProfile} />;
		});

		return (
			<div className="col-12">
				<div className={classes.root}>
					<GridItem xs={12} sm={12} md={4}>
						<CustomInput
							labelText="Search"
							id="float"
							formControlProps={{
								fullWidth : true
							}}
							inputProps={{
								onChange : (event) => this.searchChange(event, 0)
							}}
						/>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="select-multiple-chip">All Categories</InputLabel>
							<Select
								multiple
								className={classes.select}
								value={this.state.name}
								onChange={this.handleChange}
								input={<Input id="select-multiple-chip" />}
								renderValue={(selected) => (
									<div className={classes.chips}>
										{selected.map((nname) => (
											<Chip key={nname} label={nname} className={classes.chip} />
										))}
									</div>
								)}
								MenuProps={MenuProps}
							>
								{categoriess.map((category, i) => (
									<MenuItem
										key={category._id}
										title={category._id}
										value={{ values: category._id, title: category.name }}
										style={getStyles(category._id, this)}
									>
										{category.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</GridItem>
				</div>
				<div>
					<GridContainer>{PrintIt}</GridContainer>
				</div>
			</div>
		);
	}
}
Businesses.propTypes = {
	classes          : PropTypes.object.isRequired,
	categories       : PropTypes.object.isRequired,
	getAllCategories : PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	auth        : state.auth,
	categoriess : state.category.categories
	//loading: state.business.loading
});

export default connect(mapStatetoProps, { getAllCategories })(withStyles(styles, { withTheme: true })(Businesses));
