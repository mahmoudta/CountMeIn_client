import { CREATE_CATEGORY, CATEGORY_LOADING, GET_ALL_CATEGORIES, CREATE_CATEGORY_ERROR } from '../actions/types';

const initialState = {
	category: {},
	categories: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_CATEGORY:
			return {
				...state,
				success: ' category successfully added',
				loading: false
			};
		case CREATE_CATEGORY_ERROR: {
			return {
				...state,
				error: action.payload,
				loading: false
			};
		}
		case GET_ALL_CATEGORIES:
			return {
				...state,
				categories: action.payload,
				loading: false
			};
		case CATEGORY_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		default:
			return state;
	}
}
