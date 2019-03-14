import { LOCAL_SIGN_IN, USER_LOADING } from '../actions/types';

const initialState = {
	user: {},
	token: '',
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case LOCAL_SIGN_IN:
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loading: false
			};
		case USER_LOADING: {
			return {
				...state,
				loading: true
			};
		}
		default:
			return state;
	}
}
