import axios from 'axios';
import { API } from '../consts';
import isEmpty from 'lodash/isEmpty';
import { appendNotification } from './authActions';
import moment from 'moment';

import {
	GET_BUSINESS_APPOINTMENTS,
	APPOINTMENT_LOADING,
	TODAY_UPCOMING_APPOINTMENTS,
	GET_FREE_TIME_SUGGESTION,
	SET_NEW_APPOINTMENT,
	SET_FLASH_MESSAGE,
	GET_REVIEW_BY_BUSINESS,
	// NEXT_APPOINTMENT_ALERT,
	APPOINTMENT_CHECK,
	GET_REVIEW_AS_CUSTOMER
} from './types';

export const getBusinessAppointmentsByDate = (business_id, date) => (dispatch) => {
	dispatch(setAppointmentLoading());
	// dispatch(getTodaysReadyAppointment(business_id));
	axios
		.get(`${API}/appointments/getBusinessAppointmentsByDate/${business_id}/${date}`)
		.then((result) => {
			dispatch({
				type    : GET_BUSINESS_APPOINTMENTS,
				payload : result.data.appointments
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_BUSINESS_APPOINTMENTS,
				payload : []
			});
		});
};

export const getUpcomingAppointments = (business_id) => (dispatch) => {
	axios
		.get(`${API}/appointments/getTodayUpcomingAppointments/${business_id}`)
		.then((result) => {
			dispatch({
				type    : TODAY_UPCOMING_APPOINTMENTS,
				payload : result.data.appointments
			});
			if (!isEmpty(result.data.appointments)) {
				const now = new Date();
				let time = new Date();
				const filtered = result.data.appointments.filter((e) => {
					return e.status === 'ready';
				});
				if (!isEmpty(filtered)) {
					new Date(time.setHours(filtered[0].time.start._hour, filtered[0].time.start._minute, 0, 0));

					setTimeout(() => {
						dispatch(
							appendNotification({
								type           : 'reminder',
								title          : 'appointment should Start',
								my_business    : true,
								appointment_id : filtered[0]._id,
								status         : 'in'
							})
						);
					}, time - now);
				}
			}
		})
		.catch((err) => {
			dispatch({
				type    : TODAY_UPCOMING_APPOINTMENTS,
				payload : []
			});
		});
};
export const appointmentCheck = (data) => (dispatch) => {
	return axios
		.put(`${API}/appointments/appointmentCheck`, data)
		.then((result) => {
			dispatch({
				type    : APPOINTMENT_CHECK,
				payload : result.data.appointment
			});
			dispatch(getBusinessAppointmentsByDate(result.data.appointment.business_id, moment().format('YYYY-MM-DD')));
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type : 'success',
					text : `Your appointment successfully checked-${data.action}`
				}
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};
export const setBusinessReview = (data) => (dispatch) => {
	const page = Number(data.page);
	axios
		.put(`${API}/appointments/setBusinessReview`, data)
		.then((result) => {
			if (page === 1) {
				dispatch({
					type    : SET_FLASH_MESSAGE,
					message : {
						type   : 'success',
						text   : `Your Review successfully saved`,
						action : { next: 'REDIRECT_TO_MYSCHEDULE' }
					}
				});
			}
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};

export const getReviewsByBusiness = (business_id) => (dispatch) => {
	dispatch(setAppointmentLoading());

	axios
		.get(`${API}/appointments/getReviewByBusinessId/${business_id}`)
		.then((result) => {
			dispatch({
				type    : GET_REVIEW_BY_BUSINESS,
				payload : result.data.reviews
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_REVIEW_BY_BUSINESS,
				payload : []
			});

			// dispatch({
			// 	type    : SET_FLASH_MESSAGE,
			// 	message : { type: 'error', text: 'No Reviews found' }
			// });
		});
};

export const getReviewAsCustomer = () => (dispatch) => {
	dispatch(setAppointmentLoading());
	axios
		.get(`${API}/appointments/getReviewAsCustomer`)
		.then((result) => {
			dispatch({
				type    : GET_REVIEW_AS_CUSTOMER,
				payload : result.data.reviews
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_REVIEW_AS_CUSTOMER,
				payload : []
			});

			// dispatch({
			// 	type    : SET_FLASH_MESSAGE,
			// 	message : { type: 'error', text: 'No Reviews found' }
			// });
		});
};

export const getFreeTime = (data) => (dispatch) => {
	// dispatch(setAppointmentLoading());
	axios
		.post(`${API}/algorithms/freetime`, data)
		.then((result) => {
			dispatch({
				type    : GET_FREE_TIME_SUGGESTION,
				payload : result.data.dates[0]
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_FREE_TIME_SUGGESTION,
				payload : {}
			});
		});
};

export const businessNewAppointment = (data) => (dispatch) => {
	axios
		.post(`${API}/appointments/business/setAppointmnet`, data)
		.then((result) => {
			dispatch({
				type    : SET_NEW_APPOINTMENT,
				payload : result.data.appointment
			});
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'success', text: 'Appointment successfully added' }
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_NEW_APPOINTMENT,
				payload : {}
			});
		});
};

export const setAppointmentLoading = () => (dispatch) => {
	return {
		type : APPOINTMENT_LOADING
	};
};
