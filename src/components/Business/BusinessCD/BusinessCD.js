import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
/* Component */
import BusinessWizardForm from './BusinessWizardForm';

/* FUNCTIONS */

/* UTILS */

class BusinessCD extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false
		};
	}

	componentDidMount() {
		let path = window.location.pathname.split('/');
		if (path[2] === 'edit') {
			this.setState({ isEdit: true });
		}
	}
	render() {
		return (
			<section className="my-5">
				<div className="container">
					{this.state.isEdit ? (
						<BusinessWizardForm title={'Edit Your Business'} />
					) : (
						<BusinessWizardForm title={'Create a Business'} />
					)}
				</div>
			</section>
		);
	}
}

// BusinessCD.propTypes = {
// 	categories: PropTypes.array.isRequired,
// 	getAllCategories: PropTypes.func.isRequired,
// 	// getBusinessByOwner: PropTypes.func.isRequired,
// 	myBusiness: PropTypes.object.isRequired
// };
// const mapStatetoProps = (state) => ({
// 	categories: state.category.categories,
// 	myBusiness: state.business.myBusiness,
// 	user: state.auth.user
// });
export default BusinessCD;
