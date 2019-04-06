import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import S3 from 'aws-s3';

/* UTILS */
import { S3IMAGESCONFIG, IMAGES } from '../../consts';
import { getAllCategories } from '../../actions/categoryActions';
import { createNewBusiness } from '../../actions/businessActions';

/* COmponenets */
import CreateFStep from './CreateFStep';
import CreateSecStep from './CreateSecStep';
import CreateThirdStep from './CreateThirdStep';

//Optional Import
class CreateBusiness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			categories: [],
			imgLoading: false,
			name: '',
			img: '',
			breakTime: 10,
			category: '',
			working: [],
			purposes: []
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleWork = this.handleWork.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handlePurpose = this.handlePurpose.bind(this);
	}

	componentDidMount = async () => {
		if (isEmpty(this.props.categories)) {
			const categories = await this.props.getAllCategories();
			this.setState({ categories: categories.payload });
		}
	};

	uploadFile = (e) => {
		this.setState({ imgLoading: true });
		var newName = this.props.user.sub;
		const S3Client = new S3(S3IMAGESCONFIG);
		S3Client.uploadFile(e.target.files[0], newName)
			.then((data) => {
				console.log(data);
				this.setState({ img: data.key, imgLoading: false });
			})
			.catch((err) => console.error(err));
	};

	/* handle the steps of the form */
	nextStep = () => {
		const { step } = this.state;
		this.setState({ step: step + 1 });
	};
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	/* Fileds change handler */
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleWork = (e) => {
		var working = this.state.working;
		var index = working.findIndex((elem) => {
			return elem.day === e.target.value;
		});
		if (index > -1) {
			working[index].opened = false;
			this.setState({ working: working });
		} else {
			working.push({
				day: e.target.value.toLowerCase(),
				opened: true,
				from: '00:00',
				until: '00:00'
			});
			this.setState({ working: working });
		}
	};
	handleTime = (e) => {
		var choice = e.target.name.split(' ');
		var working = this.state.working;
		var index = working.findIndex((elem) => {
			return elem.day === choice[0];
		});

		working[index][choice[1]] = e.target.value;
		this.setState({ working: working });
	};

	handlePurpose = (e) => {
		const { purposes } = this.state;
		const item = e.target.selectedOptions[0];
		purposes.push({
			name: item.text,
			value: item.value,
			time: Number(item.getAttribute('time'))
		});
		this.setState({ purposes });
	};

	handleSubmit = async (e) => {
		e.preventDefault();

		const { name, img, breakTime, category, working, purposes } = this.state;
		const splitPurposes = async () => {
			var services = [];
			for (const element of purposes) {
				await services.push({
					purpose_id: element.value,
					time: element.time
				});
				return await services;
			}
		};
		const services = await splitPurposes();
		this.props
			.createNewBusiness({ name, img, breakTime, category, working, services })
			.then((res) => console.log(res));
	};

	render() {
		const { step } = this.state;
		switch (step) {
			case 1:
				return (
					<CreateFStep
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						uploadFile={this.uploadFile}
						values={this.state}
					/>
				);
			case 2:
				return (
					<CreateSecStep
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						handleWork={this.handleWork}
						handleTime={this.handleTime}
						values={this.state}
					/>
				);
			case 3:
				return (
					<CreateThirdStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						prevStep={this.prevStep}
						handleChange={this.handlePurpose}
					/>
				);
		}
	}
}
CreateBusiness.propTypes = {
	categories: PropTypes.array.isRequired,
	getAllCategories: PropTypes.func.isRequired,
	createNewBusiness: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	categories: state.category.categories,
	user: state.auth.user
});
export default connect(mapStatetoProps, { getAllCategories, createNewBusiness })(CreateBusiness);
