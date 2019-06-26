import {
	GET_STATISTICS_HEADER,
	SET_STATISTICS_LOADING,
	GLOBAL_STATISTICS,
	APPOINTMENTS_STATISTICS,
	SERVICES_STATISTICS,
	FOLLOWERS_STATISTICS
} from '../actions/types';

const initialState = {
	header         : {},
	global         : {},
	comparison     : {},
	traffic        : [],
	services       : [],
	followersStats : [],
	loading        : false
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
		case GLOBAL_STATISTICS: {
			return {
				...state,
				global  : action.payload,
				loading : false
			};
		}
		case APPOINTMENTS_STATISTICS: {
			return {
				...state,
				comparison : action.payload.comparison,
				traffic    : action.payload.appointmntsStats,
				loading    : false
			};
		}
		case SERVICES_STATISTICS: {
			return {
				...state,
				services : action.payload,
				loading  : false
			};
		}
		case FOLLOWERS_STATISTICS: {
			return {
				...state,
				followersStats : action.payload,
				loading        : false
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
