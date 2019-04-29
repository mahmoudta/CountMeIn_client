import axios from 'axios';
import { API } from '../consts';

// // import { PICK_BUSINESS, PICK_PURPOSE, PICK_METHOD, PICK_DATE, PICK_TIME, SET_APPOINTMENT } from './types';

import { GET_BUSINESS_APPOINTMENTS, APPOINTMENT_LOADING } from './types';

export const getBusinessAppointmentsByDate = (business_id, date) => (dispatch) => {
	dispatch(setAppointmentLoading());
	return axios
		.get(`${API}/appointments/getBusinessAppointmentsByDate/${business_id}/${date}`)
		.then((result) => {
			return dispatch({
				type: GET_BUSINESS_APPOINTMENTS,
				payload: result.data.data
			});
		})
		.catch((err) => {
			return dispatch({
				type: GET_BUSINESS_APPOINTMENTS,
				payload: []
			});
		});
};

export const setAppointmentLoading = () => (dispatch) => {
	return {
		type: APPOINTMENT_LOADING
	};
};
