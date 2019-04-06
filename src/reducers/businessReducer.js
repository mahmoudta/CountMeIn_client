import { CREATE_BUSINESS, GET_BUSINESS_BY_OWNER, GET_BUSINESS_BY_ID } from '../actions/types';
// import isEmpty from 'lodash/isEmpty';

const initialState = {
	myBusiness: {},
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
		default:
			return state;
	}
}
