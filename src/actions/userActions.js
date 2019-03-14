import axios from 'axios';
import { API } from '../consts';
import { setAuthorizationToken } from '../utils/setAuthorizationToken';

import { LOCAL_SIGN_IN, USER_LOADING } from './types';

export const localSignIn = (user) => (dispatch) => {
	dispatch(setUserLoading());
	console.log('Action:', user);
	axios
		.post(`${API}/users/signin`, user)
		.then((result) => {
			const token = result.data.token;
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);

			dispatch({
				type: LOCAL_SIGN_IN,
				payload: result.data
			});
		})
		.catch((err) => {
			dispatch({
				type: LOCAL_SIGN_IN,
				payload: { message: 'cant get langs' }
			});
		});
};

export const setUserLoading = () => {
	return {
		type: USER_LOADING
	};
};
