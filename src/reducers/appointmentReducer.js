import {
	APPOINTMENT_LOADING,
	GET_BUSINESS_APPOINTMENTS,
	TODAY_UPCOMING_APPOINTMENTS,
	GET_FREE_TIME_SUGGESTION,
	SET_NEW_APPOINTMENT,
	// NEXT_APPOINTMENT_ALERT,
	APPOINTMENT_CHECK,
	GET_REVIEW_BY_BUSINESS
} from '../actions/types';
const initialState = {
	appointments       : [],
	inProgress         : {},
	ready_appointments : [],
	upComing           : [],
	reviews            : [],
	freeTime           : {},
	loading            : false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_BUSINESS_APPOINTMENTS:
			return {
				...state,
				appointments : action.payload,
				loading      : false
			};
		case APPOINTMENT_LOADING:
			return {
				...state,
				loading : true
			};
		case GET_REVIEW_BY_BUSINESS:
			return {
				...state,
				reviews : action.payload,
				loading : false
			};
		case TODAY_UPCOMING_APPOINTMENTS:
			return {
				...state,
				upComing : action.payload
			};
		case APPOINTMENT_CHECK:
			let newUpComing = state.upComing;
			newUpComing.find((appointment, i) => {
				if (appointment._id.toString() === action.payload._id.toString()) {
					newUpComing[i] = action.payload;
				}
			});
			return {
				...state,
				upComing : newUpComing
			};
		case SET_NEW_APPOINTMENT:
			const new_appointments = state.appointments;
			new_appointments.push(action.payload);
			return {
				...state,
				loading      : false,
				freeTime     : {},
				appointments : new_appointments
			};
		case GET_FREE_TIME_SUGGESTION:
			return {
				...state,
				freeTime : action.payload
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
