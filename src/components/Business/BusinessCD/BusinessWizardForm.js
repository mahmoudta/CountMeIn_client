import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import S3 from 'aws-s3';
import isEmpty from 'lodash/isEmpty';
/* Components */
import BasicinfoForm from './BasicinfoForm';
import ManagmentForm from './ManagmentForm';
import ServicesForm from './ServicesForm';
/* UTILS */
import { S3IMAGESCONFIG } from '../../../consts';
import { isTimeBigger } from '../../../utils/date';
import { createNewBusiness } from '../../../actions/businessActions';
import { getTime } from '../../../utils/date';
// import { getAllCategories } from '../../../actions/categoryActions';
// import { getBusinessByOwner } from '../../../actions/businessActions';

/* style */
import '../Business.css';

const phoneRegex = RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);

const validForm = ({ stepErros, ...rest }) => {
	let valid = true;
	Object.values(stepErros).forEach((val) => {
		!isEmpty(val) && (valid = false);
	});
	if (rest) {
		Object.values(rest).forEach((val) => {
			isEmpty(val) && (valid = false);
		});
	}

	return valid;
};

class BusinessWizardForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
			mainCategories: [],
			/* STEP 1 */
			step1Errors: {
				name: '',
				category: '',
				phone: ''
				// postal_code: ''
			},
			/* Location */
			street: '',
			city: '',
			building: '',
			postal_code: '',

			imgLoading: false,
			categories: [] /* required */,
			description: '',
			name: '' /* required */,
			img: '',
			phone: 0 /* required */,

			/* STEP 2 */
			step2Errors: {},
			breakTime: 10,
			working: [],

			/* STEP 3 */
			step3Errors: {},

			services: []
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.renderView = this.renderView.bind(this);
		this.buildSchedule = this.buildSchedule.bind(this);
		this.handleSchedule = this.handleSchedule.bind(this);
		this.handleServices = this.handleServices.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit = async (e) => {
		e.preventDefault();

		const {
			street,
			city,
			building,
			postal_code,
			breakTime,
			categories,
			description,
			name,
			img,
			phone,
			working,
			services
		} = this.state;
		// const splitPurposes = async () => {
		// 	var services = [];
		// 	for (const element of purposes) {
		// 		await services.push({
		// 			purpose_id: element.value,
		// 			time: element.time
		// 		});
		// 		return await services;
		// 	}
		// };
		// const services = await splitPurposes();
		this.props.createNewBusiness({
			street,
			city,
			building,
			postal_code,
			breakTime,
			categories,
			description,
			name,
			img,
			phone,
			working,
			services
		});
	};
	static getDerivedStateFromProps(props, state) {
		const { categories, myBusiness } = props;
		if (!isEmpty(myBusiness._id)) {
			return {
				mainCategories: props.categories,
				categories: myBusiness.profile.category_id,
				description: myBusiness.profile.description,
				phone: myBusiness.profile.phone,
				name: myBusiness.profile.name,
				working: myBusiness.profile.working_hours,
				img: myBusiness.profile.img,
				breakTime: myBusiness.profile.break_time,
				services: myBusiness.profile.services,
				street: myBusiness.profile.location.street,
				city: myBusiness.profile.location.city,
				building: myBusiness.profile.location.building,
				postal_code: myBusiness.profile.location.postal_code
			};
		}
		return {
			mainCategories: categories
		};
	}

	/*                "opened": true,
                "from": {
                    "$date": "2019-04-04T06:10:35.448Z"
                },
                "until": {
                    "$date": "2019-04-04T15:00:35.449Z"
                } */
	async buildSchedule() {
		const days = [ 'sunday', 'monday', 'tuesday', 'wedensday', 'thursday', 'friday', 'saturday' ];
		let Schedule = [];
		for (let i in days) {
			await Schedule.push({
				day: days[i],
				opened: false,
				from: '00:00',
				until: '00:00',
				break: {
					isBreak: false,
					from: '00:00',
					until: '00:00'
				}
			});
		}

		const working = await Schedule;
		this.setState({ working });
	}

	handleServices = (value, action) => {
		const name = action.name;
		this.setState({ [name]: value });
		// this.setState({ services }, () => console.log(this.state));
	};
	handleSchedule = (e, index) => {
		const { name, value } = e.target;
		let working = this.state.working;
		let step2Errors = this.state.step2Errors;

		switch (name) {
			case 'from':
				working[index].from = value;
				break;
			case 'until':
				working[index].until = value;
				break;
			case 'break':
				break;
			case 'break_from':
				break;
			case 'break_until':
				break;

			default:
				working[index].opened = !working[index].opened;
				break;
		}

		/* day error */
		if (working[index].opened) {
			step2Errors[working[index].day] =
				isEmpty(working[index].from) ||
				isEmpty(working[index].until) ||
				isTimeBigger(working[index].until, working[index].from)
					? 'invalid range'
					: '';
		}

		this.setState({ step2Errors, working });
	};
	async componentDidMount() {
		let { working } = this.state;
		if (working.length === 0) {
			console.log('if');
			this.buildSchedule();
		} else {
			console.log('else');
			const newWorking = working.map((day) => {
				return {
					day: day.day,
					from: getTime(day.from),
					until: getTime(day.until),
					breakTime: day.break_time
				};
			});
			this.setState({ working: newWorking });
		}
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		let step1Errors = this.state.step1Errors;
		let step2Errors = this.state.step2Errors;

		switch (name) {
			case 'name':
				step1Errors.name = value.length < 3 ? 'minimum 3 charcters required' : '';
				break;
			case 'categories':
				step1Errors.category = value === '-1' ? 'you have to select category' : '';
				break;
			case 'phone':
				step1Errors.phone = phoneRegex.test(value) ? '' : 'it must contain 10 digits';
				break;
		}

		this.setState({ step1Errors, [name]: value });
	};

	uploadFile = (e) => {
		this.setState({ imgLoading: true });
		var newName = this.props.user.sub;
		const S3Client = new S3(S3IMAGESCONFIG);
		S3Client.uploadFile(e.target.files[0], newName)
			.then((data) => {
				this.setState({ img: data.key, imgLoading: false });
			})
			.catch((err) => console.error(err));
	};

	nextStep = () => {
		const { step, step1Errors, step2Errors, ...state } = this.state;
		let obj = {};
		switch (step) {
			case 1:
				obj = {
					stepErros: step1Errors,
					name: state.name,
					// category: state.category,
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
		if (step > 1) {
			this.setState({ step: step - 1 });
		}
	};

	renderView = () => {
		const { step } = this.state;
		switch (step) {
			case 1:
				return (
					<BasicinfoForm handleChange={this.handleChange} uploadFile={this.uploadFile} values={this.state} />
				);
			case 2:
				return (
					<ManagmentForm
						handleChange={this.handleChange}
						handleSchedule={this.handleSchedule}
						values={this.state}
					/>
				);
			case 3:
				return (
					<ServicesForm
						handleChange={this.handleChange}
						handleServices={this.handleServices}
						values={this.state}
					/>
				);
		}
	};

	render() {
		const { step } = this.state;
		// const ShowForm = this.renderView();
		return (
			<div className="col-10 mx-auto wizard rounded bg-white shadow px-md-0 pb-3">
				<div className="wizard-header pt-5">
					<h2 className="d-block w-100 text-center">{this.props.title}</h2>

					<div className="wizard-steps bg-light my-3">
						<ul className="nav nav-pills nav-justified">
							<li className={`nav-item to-uppercase ${step === 1 ? 'active' : ''}`}>
								<span className="">Basic info</span>
							</li>
							<li className={`nav-item to-uppercase ${step === 2 ? 'active' : ''}`}>
								<span className="">Schedule Managment</span>
							</li>
							<li className={`nav-item to-uppercase ${step === 3 ? 'active' : ''}`}>
								<span className="">Services</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="wizard-body">{this.renderView()}</div>
				<div className="wizard-footer clearfix">
					<div className="float-left">
						{step > 1 && (
							<button className="btn btn-sm btn-secondary shadow to-uppercase" onClick={this.prevStep}>
								previous
							</button>
						)}
					</div>
					<div className="float-right">
						{step != 3 ? (
							<button className="btn btn-sm btn-primary shadow to-uppercase" onClick={this.nextStep}>
								next
							</button>
						) : (
							<button className="btn btn-sm btn-primary shadow to-uppercase" onClick={this.handleSubmit}>
								finish
							</button>
						)}
					</div>
				</div>
			</div>
		);
	}
}
// export default BusinessWizardForm;
BusinessWizardForm.propTypes = {
	user: PropTypes.object.isRequired,
	// getAllCategories: PropTypes.func.isRequired,
	// getBusinessByOwner: PropTypes.func.isRequired,
	// myBusiness: PropTypes.object.isRequired
	createNewBusiness: PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	// categories: state.category.categories,
	// myBusiness: state.business.myBusiness,
	user: state.auth.user
});
export default connect(mapStatetoProps, { createNewBusiness })(BusinessWizardForm);
