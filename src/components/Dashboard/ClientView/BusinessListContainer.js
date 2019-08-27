import React, { Component } from 'react';
import BusinessList from './BusinessList';
import axios from 'axios';
import { API } from '../../../consts';
import GridContainer from '../../Interface/Grid/GridContainer.jsx';
import Loading from '../../globalComponents/LoadingSmall';
import './hideScroll.css';

export default class BusinessListContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fallowedArr       : [],
			fallowedComponent : null,
			refresh           : false,
			loading           : false
		};
		this.Loading = this.Loading.bind(this);
		this.getData = this.getData.bind(this);
	}

	Loading = (bool) => {
		this.setState({ loading: bool });
	};

	async componentDidMount() {
		this.getData();
	}

	getData() {
		this.setState({ fallowedArr: [] });
		axios
			.get(`${API}/users/getFallowedBusinesses`, {})
			.then((response) => {
				this.setState({ fallowedArr: response.data.following });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		const PrintIt = this.state.fallowedArr.map((i, m) => {
			return <BusinessList key={m} business={i} loading={this.Loading} getData={this.getData} />;
		});
		return (
			<GridContainer
				className="cont"
				style={{
					maxHeight : '175px',
					overflowX : 'scroll',
					overflowY : 'none'
				}}
			>
				{this.state.loading ? <Loading /> : PrintIt}
			</GridContainer>
		);
	}
}
