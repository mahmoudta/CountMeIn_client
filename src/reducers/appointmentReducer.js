import {
	APPOINTMENT_LOADING,
	GET_BUSINESS_APPOINTMENTS,
	TODAY_READY_APPOINTMENTS,
	// NEXT_APPOINTMENT_ALERT,
	SET_APPOINTMENT_ACTIVE
} from '../actions/types';
const initialState = {
	appointments: [],
	inProgress: {},
	ready_appointments: [],
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
		case TODAY_READY_APPOINTMENTS:
			return {
				...state,
				ready_appointments: action.payload
			};
		case SET_APPOINTMENT_ACTIVE:
			return {
				...state,
				inProgress: action.payload
			};
		// case NEXT_APPOINTMENT_ALERT:
		// 	console.log(action.payload.timeout);
		// 	setTimeout(() => {}, action.payload.timeout);
		// 	return {
		// 		...state
		// 	};
		default:
			return state;
	}
}
