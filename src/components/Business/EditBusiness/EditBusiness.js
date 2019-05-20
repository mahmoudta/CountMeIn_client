import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import S3 from 'aws-s3';
/* Components */
import Basicinfo from '../Basicinfo';

/* UTILS */
import { S3IMAGESCONFIG } from '../../../consts';

/* style */
import '../Business.css';

class EditBusiness extends Component {
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
		this.handleChange = this.handleChange.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.renderView = this.renderView.bind(this);
	}
	handleChange = (e) => {
		// const { name, value } = e.target;
		// let step1Errors = this.state.step1Errors;
		// switch (name) {
		// 	case 'name':
		// 		step1Errors.name = value.length < 3 ? 'minimum 3 charcters required' : '';
		// 		break;
		// 	case 'category':
		// 		step1Errors.category = value === '-1' ? 'you have to select category' : '';
		// 		break;
		// 	case 'phone':
		// 		step1Errors.phone = phoneRegex.test(value) ? '' : 'it must contain 10 digits';
		// 		break;
		// }
		// this.setState({ step1Errors, [name]: value }, () => console.log(this.state));
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

	renderView = () => {
		const { step } = this.state;
		switch (step) {
			case 1:
				return <Basicinfo handleChange={this.handleChange} uploadFile={this.uploadFile} values={this.state} />;
		}
	};
	render() {
		const { step } = this.state;
		return (
			<section className="my-5">
				<div className="container">
					<div className="wizard rounded bg-white shadow pb-3">
						<div className="wizard-header pt-5">
							<h2 className="d-block w-100 text-center">Edit Your Business</h2>

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
						<div className="wizard-body">
							{step === 1 && (
								<Basicinfo
									handleChange={this.handleChange}
									uploadFile={this.uploadFile}
									values={this.state}
								/>
							)}
						</div>
						<div className="wizard-footer clearfix">
							<div className="float-left">
								{step > 1 && (
									<button className="btn btn-sm btn-primary shadow to-uppercase">previous</button>
								)}
							</div>
							<div className="float-right">
								{step != 3 ? (
									<button className="btn btn-sm btn-primary shadow to-uppercase">next</button>
								) : (
									<button className="btn btn-sm btn-primary shadow to-uppercase">finish</button>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
// CreateBusiness.propTypes = {
// 	// categories: PropTypes.array.isRequired,
// 	// getAllCategories: PropTypes.func.isRequired,
// 	// createNewBusiness: PropTypes.func.isRequired
// };
const mapStatetoProps = (state) => ({
	// categories: state.category.categories,
	user: state.auth.user
});
export default connect(mapStatetoProps, {})(EditBusiness);
