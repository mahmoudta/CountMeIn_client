// // import { PICK_BUSINESS, PICK_PURPOSE, PICK_METHOD, PICK_DATE, PICK_TIME, SET_APPOINTMENT } from '../actions/types';

import { APPOINTMENT_LOADING, GET_BUSINESS_APPOINTMENTS } from '../actions/types';
const initialState = {
	appointments: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_BUSINESS_APPOINTMENTS:
			return {
				...state,
				appointments: action.payload,
				loading: false
			};
		case APPOINTMENT_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
