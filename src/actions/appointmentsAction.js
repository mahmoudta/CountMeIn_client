import axios from 'axios';
import { API } from '../consts';
import isEmpty from 'lodash/isEmpty';

import {
	GET_BUSINESS_APPOINTMENTS,
	APPOINTMENT_LOADING,
	TODAY_READY_APPOINTMENTS,
	GET_FREE_TIME_SUGGESTION,
	// NEXT_APPOINTMENT_ALERT,
	SET_APPOINTMENT_ACTIVE
} from './types';

export const getBusinessAppointmentsByDate = (business_id, date) => (dispatch) => {
	dispatch(setAppointmentLoading());
	// dispatch(getTodaysReadyAppointment(business_id));
	axios
		.get(`${API}/appointments/getBusinessAppointmentsByDate/${business_id}/${date}`)
		.then((result) => {
			dispatch({
				type: GET_BUSINESS_APPOINTMENTS,
				payload: result.data.appointments
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_BUSINESS_APPOINTMENTS,
				payload: []
			});
		});
};

export const getTodaysReadyAppointments = (business_id) => (dispatch) => {
	axios
		.get(`${API}/appointments/getTodaysReadyAppointments/${business_id}`)
		.then((result) => {
			dispatch({
				type: TODAY_READY_APPOINTMENTS,
				payload: result.data.appointments
			});
			if (!isEmpty(result.data.appointments)) {
				let time = new Date();
				new Date(
					time.setHours(
						result.data.appointments[0].time.start._hour,
						result.data.appointments[0].time.start._minute
					)
				);
				const now = new Date();
				setTimeout(() => {
					dispatch(setAppointmentActive(result.data.appointments[0]._id));
				}, time - now);
			}
			// dispatch({
			// 	type: NEXT_APPOINTMENT_ALERT,
			// 	payload: {
			// 		appointment: result.data.appointments[0],
			// 		timeout: time - now
			// 	}
		})
		.catch((err) => {
			console.log('error');
			dispatch({
				type: TODAY_READY_APPOINTMENTS,
				payload: []
			});
		});
};
export const setAppointmentActive = (appointment_id) => (dispatch) => {
	axios
		.put(`${API}/appointments/setAppointmentActive/${appointment_id}`)
		.then((result) => {
			dispatch({
				type: SET_APPOINTMENT_ACTIVE,
				payload: result.data.appointment
			});
			dispatch(getTodaysReadyAppointments(result.data.appointment.business_id));
		})
		.catch((err) => {
			console.log(err);
		});
};

export const updateAppointmentStatus = (appointment_id) => (dispatch) => {
	axios
		.get(`${API}/appointments/getBusinessAppointmentsByDate/${appointment_id}`)
		.then((result) => {
			dispatch({
				type: TODAY_READY_APPOINTMENTS,
				payload: result.data.appointments
			});
			// dispatch({
			// 	type: NEXT_APPOINTMENT_ALERT,
			// 	payload: result.data.appointments[0]
			// });
		})
		.catch((err) => {
			dispatch({
				type: TODAY_READY_APPOINTMENTS,
				payload: []
			});
		});
};

export const getFreeTime = (data) => (dispatch) => {
	// dispatch(setAppointmentLoading());
	axios
		.post(`${API}/algorithms/freetime`, data)
		.then((result) => {
			console.log(result.data);
			dispatch({
				type: GET_FREE_TIME_SUGGESTION,
				payload: result.data.dates[0]
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_FREE_TIME_SUGGESTION,
				payload: {}
			});
		});
};

export const setAppointmentLoading = () => (dispatch) => {
	return {
		type: APPOINTMENT_LOADING
	};
};
