import {
	CREATE_CATEGORY,
	CATEGORY_LOADING,
	GET_ALL_CATEGORIES,
	DELETE_CATEGORY,
	DELETE_SERVICE,
	UPDATE_CATEGORY,
	UPDATE_SERVICE
} from '../actions/types';

const initialState = {
	categories : [],
	loading    : false,
	error      : ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_CATEGORY:
			return {
				...state,
				loading : false
			};

		case DELETE_CATEGORY: {
			return Object.assign({}, state, {
				categories : [ ...state.categories.filter((category) => category._id !== action.payload._id) ],
				loading    : false
			});
		}
		case UPDATE_CATEGORY:
			return {
				...state,
				loading : false
			};
		case UPDATE_SERVICE:
			return {
				...state,
				loading : false
			};
		case DELETE_SERVICE: {
			return Object.assign({}, state, {
				categories : [
					...state.categories.filter((category) => category._id !== action.payload._id),
					action.payload
				],
				loading    : false
			});
		}
		case GET_ALL_CATEGORIES:
			return {
				...state,
				categories : action.payload,
				loading    : false
			};
		case CATEGORY_LOADING: {
			return {
				...state,
				loading : action.payload
			};
		}
		default:
			return state;
	}
}
