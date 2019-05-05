import axios from 'axios';
import { API } from '../consts';

export const getClientsAppointments = (id) => (dispatch) => {
	dispatch(setPurposeNull());
	axios
		.get(`${API}/appointments/getClientsAppointments/${id}`)
		.then((result) => {
			dispatch({
				type: CLIENTS_APPOINTMENTS,
				payload: result.data.appointments
			});
		})
		.catch((err) => {
			dispatch({
				type: CLIENTS_APPOINTMENT,
				payload: { message: 'cant get the purposes' }
			});
		});
};

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
