import {
	CREATE_CATEGORY,
	CATEGORY_LOADING,
	GET_ALL_CATEGORIES,
	CREATE_CATEGORY_ERROR,
	DELETE_CATEGORY
} from '../actions/types';

const initialState = {
	categories: [],
	loading: false,
	error: ''
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
		case DELETE_CATEGORY: {
			return Object.assign({}, state, {
				categories: [ ...state.categories.filter((category) => category._id !== action.payload._id) ],
				loading: false
			});
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
