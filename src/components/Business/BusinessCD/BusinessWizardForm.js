import React, { Component } from 'react';
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
import { createNewBusiness, getBusinessByOwner, updateBusiness } from '../../../actions/businessActions';
import { getAllCategories } from '../../../actions/categoryActions';

import { dateToStringTime } from '../../../utils/date';

// import { getAllCategories } from '../../../actions/categoryActions';
// import { getBusinessByOwner } from '../../../actions/businessActions';

/* style */
import '../Business.css';

const phoneRegex = RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s]{0,1}[0-9]{3}[-\s]{0,1}[0-9]{4}$/);

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
			step           : 1,
			mainCategories : [],
			/* STEP 1 */
			step1Errors    : {
				name     : '',
				category : '',
				phone    : ''
				// postal_code: ''
			},

			/* Location */
			street         : '',
			city           : '',
			building       : '',
			postal_code    : '',

			imgLoading     : false,
			categories     : [] /* required */,
			description    : '',
			name           : '' /* required */,
			img            : '',
			phone          : 0 /* required */,

			/* STEP 2 */
			step2Errors    : {},
			breakTime      : 10,
			working        : [],
			working_edits  : [ false, false, false, false, false, false, false ],

			/* STEP 3 */
			step3Errors    : {},

			services       : []
		};
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.renderView = this.renderView.bind(this);
		this.scheduleBuilder = this.scheduleBuilder.bind(this);
		this.handleSchedule = this.handleSchedule.bind(this);
		this.handleServices = this.handleServices.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.selectedItems = this.selectedItems.bind(this);
	}
	selectedItems(myBusiness, categories) {
		if (!isEmpty(myBusiness) && !isEmpty(categories)) {
			const selectedCategories = myBusiness.categories.map((category) => {
				return {
					value : category._id,
					label : category.name
				};
			});

			const services = myBusiness.services.map((service) => {
				return {
					label : service.service_id.title,
					value : service.service_id._id,
					cost  : service.cost,
					time  : service.time
				};
			});

			return { categories: selectedCategories, services: services };
		}
	}

	async scheduleBuilder() {
		const { myBusiness } = this.props;
		if (!myBusiness.error && !isEmpty(myBusiness)) {
			const schedule = await myBusiness.working_hours.map((day) => {
				return {
					day    : day.day,
					opened : day.opened,
					from   : dateToStringTime(day.from),
					until  : dateToStringTime(day.until),
					break  : {
						isBreak : day.break.isBreak,
						from    : dateToStringTime(day.break.from),
						until   : dateToStringTime(day.break.until)
					}
				};
			});
			this.setState({ working: schedule });
			return;
		}
		const days = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
		let Schedule = [];
		for (let i in days) {
			await Schedule.push({
				day    : days[i],
				opened : false,
				from   : '00:00',
				until  : '00:00',
				break  : {
					isBreak : false,
					from    : '00:00',
					until   : '00:00'
				}
			});
		}

		const working = await Schedule;
		this.setState({ working });
	}

	async componentDidMount() {
		this.props.getAllCategories();
		this.props
			.getBusinessByOwner(this.props.user.sub)
			.then(async (result) => {
				if (!result.payload.error) {
					const categories = await this.props.categories;
					const business = result.payload;
					const selectedItems = await this.selectedItems(business, categories);
					// const working = this.
					this.setState({
						// mainCategories: categories,
						categories  : selectedItems.categories,
						description : business.profile.description,
						phone       : business.profile.phone,
						name        : business.profile.name,
						// working: working,
						img         : business.profile.img,
						breakTime   : business.break_time,
						services    : selectedItems.services,
						street      : business.profile.location.street,
						city        : business.profile.location.city,
						building    : business.profile.location.building,
						postal_code : business.profile.location.postal_code
					});
					this.scheduleBuilder();
					return;
				}
			})
			.catch((err) => {
				console.log(err);
			});
		this.scheduleBuilder();
	}
	handleSubmit = async (e) => {
		e.preventDefault();
		const { myBusiness } = this.props;

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
			services,
			working_edits
		} = this.state;

		if (isEmpty(myBusiness)) {
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
			return;
		}

		this.props.updateBusiness({
			business_id   : myBusiness._id,
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
			services,
			working_edits
		});
	};

	// async buildSchedule() {}

	handleServices = (value, action) => {
		/* Select Box returns object of value and action which contains type and name of the input */
		if (action && typeof action === 'object') {
			const name = action.name;
			this.setState({ [name]: value });
			return;
		}

		/* 
			* Switching the first step tp handle also the time and the cost of the service  
			* whic the first arg = event the second one is the index of target in the services array
		*/
		let services = this.state.services;
		services[action][value.target.name] = value.target.value;
		this.setState({ services });
	};
	handleSchedule = (e, index) => {
		const { name, value } = e.target;
		let working = this.state.working;
		let working_edits = this.state.working_edits;
		let step2Errors = this.state.step2Errors;

		switch (name) {
			case 'from':
				working[index].from = value;
				break;
			case 'until':
				working[index].until = value;
				break;
			case 'break':
				working[index].break.isBreak = !working[index].break.isBreak;
				break;
			case 'break_from':
				working[index].break.from = value;
				break;
			case 'break_until':
				working[index].break.until = value;
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
		working_edits[index] = true;
		this.setState({ step2Errors, working, working_edits });
	};

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
			default:
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
					stepErros : step1Errors,
					name      : state.name,
					// category: state.category,
					phone     : state.phone
				};
				// if (validForm(obj)) this.setState({ step: step + 1 });
				break;
			case 2:
				obj = {
					stepErros : step2Errors,
					working   : state.working
				};
				break;
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
						scheduleBuilder={this.scheduleBuilder}
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
			default:
				break;
		}
	};

	render() {
		// const { myBusiness } = this.props;
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
						{step !== 3 ? (
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
	user               : PropTypes.object.isRequired,
	getAllCategories   : PropTypes.func.isRequired,
	getBusinessByOwner : PropTypes.func.isRequired,
	updateBusiness     : PropTypes.func.isRequired,
	myBusiness         : PropTypes.object.isRequired,
	categories         : PropTypes.array.isRequired,
	createNewBusiness  : PropTypes.func.isRequired
};
const mapStatetoProps = (state) => ({
	categories : state.category.categories,
	myBusiness : state.business.myBusiness,
	user       : state.auth.user
});
export default connect(mapStatetoProps, { getAllCategories, getBusinessByOwner, createNewBusiness, updateBusiness })(
	BusinessWizardForm
);
