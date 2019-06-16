import { GET_STATISTICS_HEADER, SET_STATISTICS_LOADING } from '../actions/types';

const initialState = {
	header  : {},
	loading : false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_STATISTICS_HEADER: {
			return {
				...state,
				header  : action.payload,
				loading : false
			};
		}
		case SET_STATISTICS_LOADING: {
			return {
				...state,
				loading : true
			};
		}
		default:
			return state;
	}
}
