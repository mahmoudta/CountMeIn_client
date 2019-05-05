import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES
} from '../actions/types';
// import isEmpty from 'lodash/isEmpty';

const initialState = {
	myBusiness: {},
	customers: [],
	businessServices: [],
	business: {},
	loading: false,
	success: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_BUSINESS:
			return {
				...state,
				success: ' business successfully added',
				loading: false
			};
		// case CATEGORY_LOADING: {
		// 	return {
		// 		...state,
		// 		loading: true
		// 	};
		// }
		case GET_BUSINESS_BY_OWNER:
			return {
				...state,
				myBusiness: action.payload,
				loading: false
			};
		case GET_BUSINESS_BY_ID:
			return {
				...state,
				business: action.payload,
				loading: false
			};
		case GET_CUREENT_BUSINESS_CUSTOMERS:
			return {
				...state,
				customers: action.payload,
				loading: false
			};
		case GET_CUREENT_BUSINESS_SERVICES:
			return {
				...state,
				businessServices: action.payload,
				loading: false
			};
		default:
			return state;
	}
}
