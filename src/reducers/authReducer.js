import { SET_CURRENT_USER, SET_USER_ERROR, SET_AS_BUSINESS_OWNER } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
	user: {},
	isAuthenticated: false,
	error: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		case SET_USER_ERROR:
			return {
				...state,
				error: action.payload
			};
		case SET_AS_BUSINESS_OWNER:
			const newUser = state.user;
			newUser.isBusinessOwner = true;
			return {
				...state,
				user: newUser
			};
		default:
			return state;
	}
}
