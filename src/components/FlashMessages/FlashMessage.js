import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import Swal from 'sweetalert2';
import { deleteFlashMessage } from '../../actions/flashMessageActions';
import { unFollowBusiness } from '../../actions/businessActions';
import { appointmentCheck } from '../../actions/appointmentsAction';

// import { Redirect } from 'react-router';
class FlashMessage extends Component {
	constructor(props) {
		super(props);
		this.makeAction = this.makeAction.bind(this);
	}

	makeAction = (action, value = true) => {
		switch (action.next) {
			case 'UNFOLLOW_BUSINESS':
				this.props.unFollowBusiness(action.business_id);
				break;
			case 'REDIRECT_TO_PAGE':
				this.context.router.history.push(action.path);
				break;
			case 'REDIRECT_TO_DASHBAORD':
				this.context.router.history.push('/dashboard');
				break;
			case 'LATE_CHECK_IN':
				let reqData = action.data;
				reqData.isLate['late'] = value;
				this.props.appointmentCheck(reqData);
				break;
			case 'REDIRECT_TO_MYSCHEDULE':
				this.context.router.history.push('/business/pages/mySchedule');
				break;
			default:
				this.props.deleteFlashMessage();
		}
	};
	/* confirmButtonColor: '#5eba00' */
	render() {
		const { flashMessage } = this.props;
		return (
			<div>
				{!isEmpty(flashMessage) &&
					flashMessage.map((message) => {
						Swal.fire({
							title             : message.type,
							text              : message.text,
							type              : message.type,
							confirmButtonText : message.action.confirmText ? message.action.confirmText : 'Done',
							cancelButtonText  : message.action.cancelText ? message.action.cancelText : 'cancel',
							showCancelButton  : message.action.CancelButton ? message.action.CancelButton : false,
							buttonsStyling    : false,
							customClass       : {
								confirmButton : `btn mx-5 shadow ${message.type.toLowerCase() === 'warning'
									? 'btn-danger'
									: 'btn-primary'}`,
								cancelButton  : 'btn mx-5 btn-secondary shadow'
							}
						}).then((res) => {
							this.props.deleteFlashMessage();

							if (res.value) {
								this.makeAction(message.action);
							} else if (res.dismiss === 'cancel') {
								this.props.deleteFlashMessage();
								if (message.action.next === 'LATE_CHECK_IN') {
									this.makeAction(message.action, false);
								}
							}
						});
					})}
			</div>
		);
	}
}

FlashMessage.propTypes = {
	flashMessage       : PropTypes.array.isRequired,
	deleteFlashMessage : PropTypes.func.isRequired,
	unFollowBusiness   : PropTypes.func.isRequired,
	appointmentCheck   : PropTypes.func.isRequired
};
FlashMessage.contextTypes = {
	router : PropTypes.object.isRequired
};
const mapStatetoProps = (state) => ({
	flashMessage : state.flashMessage
});
export default connect(mapStatetoProps, { appointmentCheck, deleteFlashMessage, unFollowBusiness })(FlashMessage);
