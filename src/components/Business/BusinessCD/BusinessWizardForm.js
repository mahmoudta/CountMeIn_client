import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import S3 from 'aws-s3';
/* Components */
import BasicinfoForm from './BasicinfoForm';
import ManagmentForm from './ManagmentForm';
import ServicesForm from './ServicesForm';
/* UTILS */
import { S3IMAGESCONFIG } from '../../../consts';
// import { getAllCategories } from '../../../actions/categoryActions';
// import { getBusinessByOwner } from '../../../actions/businessActions';
import isEmpty from 'lodash/isEmpty';

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
			step: 2,
			mainCategories: [],
			/* STEP 1 */
			step1Errors: {
				name: '',
				category: '',
				phone: ''
			},
			imgLoading: false,
			categories: [] /* required */,
			description: '',
			name: '' /* required */,
			img: '',
			phone: 0 /* required */,

			/* STEP 2 */
			step2Errors: {},
			breakTime: 10,
			working: [
				// { day: 'sunday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'monday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'tuesday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'wedensday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'thursday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'friday', isOpened: false, from: '00:00', until: '00:00' },
				// { day: 'saturday', isOpened: false, from: '00:00', until: '00:00' }
			],

			/* STEP 3 */
			step3Errors: {},

			services: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.renderView = this.renderView.bind(this);
		this.buildSchedule = this.buildSchedule.bind(this);
	}

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
				services: myBusiness.profile.services
			};
		}
		return null;
	}
	async buildSchedule() {
		const days = [ 'sunday', 'monday', 'tuesday', 'wedensday', 'thursday', 'friday', 'saturday' ];
		let Schedule = [];
		for (let i in days) {
			await working.push({
				day: days[i],
				opened: false,
				from: '00:00',
				until: '00:00',
				break: {
					from: '',
					until: ''
				}
			});
		}
		const working = await Schedule;
		console.log(working);
		this.setState({ working });
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		let step1Errors = this.state.step1Errors;
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
		this.setState({ step1Errors, [name]: value }, () => console.log(this.state));
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
						buildSchedule={this.state.buildSchedule}
						values={this.state}
					/>
				);
			case 3:
				return <ServicesForm handleChange={this.handleChange} values={this.state} />;
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
						{step > 1 && <button className="btn btn-sm btn-secondary shadow to-uppercase">previous</button>}
					</div>
					<div className="float-right">
						{step != 3 ? (
							<button className="btn btn-sm btn-primary shadow to-uppercase" onClick={this.nextStep}>
								next
							</button>
						) : (
							<button className="btn btn-sm btn-primary shadow to-uppercase">finish</button>
						)}
					</div>
				</div>
			</div>
		);
	}
}
export default BusinessWizardForm;
// BusinessWizardForm.propTypes = {
// 	categories: PropTypes.array.isRequired,
// 	getAllCategories: PropTypes.func.isRequired,
// 	getBusinessByOwner: PropTypes.func.isRequired,
// 	myBusiness: PropTypes.object.isRequired
// 	// 	// createNewBusiness: PropTypes.func.isRequired
// };
// const mapStatetoProps = (state) => ({
// 	categories: state.category.categories,
// 	myBusiness: state.business.myBusiness,
// 	user: state.auth.user
// });
// export default connect(mapStatetoProps, { getAllCategories, getBusinessByOwner })(BusinessWizardForm);
