import axios from 'axios';
import { API } from '../consts';

import { PICK_BUSINESS, PICK_PURPOSE, PICK_METHOD, PICK_DATE, PICK_TIME, SET_APPOINTMENT } from './types';

// export const getBusinessPurpose = (id) => (dispatch) => {
// 	dispatch(setPurposeNull());
// 	axios
// 		.get(`${API}/appointments/getSubCategories/${id}`)
// 		.then((result) => {
// 			dispatch({
// 				type: PICK_PURPOSE,
// 				payload: result.data.Purposes
// 			});
// 		})
// 		.catch((err) => {
// 			dispatch({
// 				type: PICK_PURPOSE,
// 				payload: { message: 'cant get the purposes' }
// 			});
// 		});
// };

// export const setPurposeNull = () => {
// 	return {
// 		type: 'Null'
// 	};
// };

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
