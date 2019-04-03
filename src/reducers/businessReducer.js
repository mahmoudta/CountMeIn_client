import { CREATE_BUSINESS } from '../actions/types';

const initialState = {
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
		default:
			return state;
	}
}
