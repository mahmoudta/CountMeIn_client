import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import S3 from 'aws-s3';

/* UTILS */
import { S3IMAGESCONFIG } from '../../consts';
import { getAllCategories } from '../../actions/categoryActions';
import { createNewBusiness } from '../../actions/businessActions';

/* COmponenets */
import CreateFStep from './CreateFStep';
import CreateSecStep from './CreateSecStep';
import CreateThirdStep from './CreateThirdStep';
import { isTimeBigger } from '../../utils/date';

//Optional Import

const phoneRegex = RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);

const validForm = ({ stepErros, ...rest }) => {
	let valid = true;
	Object.values(stepErros).forEach((val) => {
		!isEmpty(val) && (valid = false);
	});
	if (rest) {
		console.log(rest);
		Object.values(rest).forEach((val) => {
			isEmpty(val) && (valid = false);
		});
	}

	return valid;
};
class CreateBusiness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,

			/* STEP 1 */
			step1Errors: {
				name: '',
				category: '',
				phone: ''
			},
			imgLoading: false,
			category: '' /* required */,
			description: '',
			name: '' /* required */,
			img: '',
			phone: 0 /* required */,

			/* STEP 2 */
			step2Errors: {},
			breakTime: 10,
			working: {},

			/* STEP 3 */
			step3Errors: {},
			categories: [],
			services: []
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSchedule = this.handleSchedule.bind(this);
		// this.handleWork = this.handleWork.bind(this);
		this.handleTime = this.handleTime.bind(this);
		this.handleServices = this.handleServices.bind(this);
	}

	componentDidMount = async () => {
		if (isEmpty(this.props.categories)) {
			const categories = await this.props.getAllCategories();
			this.setState({ categories: categories.payload });
		}
		// console.log(this.state.working['monday']);
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
		const { step, step1Errors, step2Errors, ...state } = this.state;
		let obj = {};
		switch (step) {
			case 1:
				obj = {
					stepErros: step1Errors,
					name: state.name,
					category: state.category,
					phone: state.phone
				};
				// if (validForm(obj)) this.setState({ step: step + 1 });
				break;
			case 2:
				obj = {
					stepErros: step2Errors,
					working: state.working
				};
			default:
				break;
		}
		if (validForm(obj)) this.setState({ step: step + 1 });
	};
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	};

	/* Fileds change handler */
	handleChange = (e) => {
		const { name, value } = e.target;
		let step1Errors = this.state.step1Errors;
		switch (name) {
			case 'name':
				step1Errors.name = value.length < 3 ? 'minimum 3 charcters required' : '';
				break;
			case 'category':
				step1Errors.category = value === '-1' ? 'you have to select category' : '';
				break;
			case 'phone':
				step1Errors.phone = phoneRegex.test(value) ? '' : 'it must contain 10 digits';
				break;
		}
		this.setState({ step1Errors, [name]: value }, () => console.log(this.state));
	};

	handleServices = (services) => {
		this.setState({ services }, () => console.log(this.state));
	};

	handleSchedule = (e, day = '') => {
		const { name, value } = e.target;
		let working = this.state.working;
		let step2Errors = this.state.step2Errors;

		if (isEmpty(day)) {
			if (!working[value]) {
				working[value] = {
					opened: true,
					from: '00:00',
					until: '00:00'
				};
			} else {
				delete working[value];
			}
		} else {
			working[day][name] = value;
			/* day error */
			step2Errors[day] =
				isEmpty(working[day]['from']) ||
				isEmpty(working[day]['until']) ||
				isTimeBigger(working[day]['until'], working[day]['from'])
					? 'invalid range'
					: '';
		}
		this.setState({ step2Errors, working }, () => console.log(this.state));
	};

	handleTime = (e, index) => {
		const { name, value } = e.target;
		let services = this.state.services;
		let step3Errors = this.state.step3Errors;
		step3Errors[index] = value < 10 ? 'minimum time 10 minutes' : '';
		step3Errors[index] = value > 120 ? 'maximum time 120 minutes' : step3Errors[index];
		services[index][name] = value;
		this.setState({ step3Errors, services }, () => console.log(this.state));
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
						handleSchedule={this.handleSchedule}
						values={this.state}
					/>
				);
			case 3:
				return (
					<CreateThirdStep
						values={this.state}
						handleSubmit={this.handleSubmit}
						prevStep={this.prevStep}
						handleServices={this.handleServices}
						handleChange={this.handlePurpose}
						handleTime={this.handleTime}
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
