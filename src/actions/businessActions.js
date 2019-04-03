import axios from 'axios';
import { API } from '../consts';

import { CREATE_BUSINESS } from './types';

export const createNewBusiness = (data) => (dispatch) => {
	// dispatch(setCategoryLoading());
	return axios
		.post(`${API}/business/`, data)
		.then((result) => {
			return dispatch({
				type: CREATE_BUSINESS,
				payload: result.data.success
			});
		})
		.catch((err) => {
			return dispatch({
				type: CREATE_BUSINESS,
				payload: err.response.data.error
			});
		});
};
