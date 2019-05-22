import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* Component */
import BusinessWizardForm from './BusinessWizardForm';

/* FUNCTIONS */
import { getAllCategories } from '../../../actions/categoryActions';
import { getBusinessByOwner } from '../../../actions/businessActions';

class BusinessCD extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit: false
		};
	}

	componentDidMount() {
		let path = window.location.pathname.split('/');
		this.props.getAllCategories();
		if (path[2] == 'edit') {
			this.props.getBusinessByOwner(this.props.user.sub);
			this.setState({ isEdit: true });
		}
	}
	render() {
		const { categories, myBusiness } = this.props;
		return (
			<section className="my-5">
				<div className="container">
					{this.state.isEdit ? (
						<BusinessWizardForm
							title={'Edit Your Business'}
							categories={categories}
							myBusiness={myBusiness}
						/>
					) : (
						<BusinessWizardForm title={'Create a Business'} categories={categories} myBusiness={{}} />
					)}
				</div>
			</section>
		);
	}
}

BusinessCD.propTypes = {
	categories: PropTypes.array.isRequired,
	getAllCategories: PropTypes.func.isRequired,
	getBusinessByOwner: PropTypes.func.isRequired,
	myBusiness: PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	categories: state.category.categories,
	myBusiness: state.business.myBusiness,
	user: state.auth.user
});
export default connect(mapStatetoProps, { getAllCategories, getBusinessByOwner })(BusinessCD);
