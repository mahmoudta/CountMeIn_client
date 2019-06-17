import axios from 'axios';
import { API } from '../consts';
import jwtDecode from 'jwt-decode';

import { setAuthorizationToken } from '../utils/setAuthorizationToken';
import { getUpcomingAppointments } from '../actions/appointmentsAction';

import { SET_CURRENT_USER, SET_USER_ERROR, SET_AS_BUSINESS_OWNER, APPEND_NOTIFICATION } from './types';

export const setCurrentUser = (user) => (dispatch) => {
	dispatch({
		type    : SET_CURRENT_USER,
		payload : user
	});
	if (user.isBusinessOwner) dispatch(getUpcomingAppointments(user.business_id));
};
export const localSignIn = (user) => (dispatch) => {
	return axios
		.post(`${API}/users/signin`, user)
		.then((result) => {
			const token = result.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
			const user = jwtDecode(token);
			dispatch(setCurrentUser(user));
		})
		.catch((err) => {
			dispatch({
				type    : SET_USER_ERROR,
				payload : 'UnAuthirized'
			});
		});
};

export const SetUserAsBusinessOwner = (token) => (dispatch) => {
	return {
		type : SET_AS_BUSINESS_OWNER
	};
};

export const appendNotification = (data) => (dispatch) => {
	axios
		.post(`${API}/users/appendNotification/`, data)
		.then((result) => {
			dispatch({
				type    : APPEND_NOTIFICATION,
				payload : result.data.notifications
			});
		})
		.catch((err) => {
			dispatch({
				type    : APPEND_NOTIFICATION,
				payload : []
			});
		});
};

export const logout = () => {
	return (dispatch) => {
		localStorage.removeItem('jwtToken');
		setAuthorizationToken(false);
		dispatch(setCurrentUser({}));
	};
};

// export const setUserLoading = () => {
// 	return {
// 		type: USER_LOADING
// 	};
// };
