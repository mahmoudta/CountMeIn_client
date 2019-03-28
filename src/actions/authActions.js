import axios from 'axios';
import { API } from '../consts';
import jwtDecode from 'jwt-decode';

import { setAuthorizationToken } from '../utils/setAuthorizationToken';

import { SET_CURRENT_USER, SET_USER_ERROR } from './types';

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		payload: user
	};
}
export const localSignIn = (user) => (dispatch) => {
	return axios
		.post(`${API}/users/signin`, user)
		.then((result) => {
			const token = result.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser(jwtDecode(token)));
		})
		.catch((err) => {
			dispatch({
				type: SET_USER_ERROR,
				payload: 'UnAuthirized'
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
