import axios from 'axios';
import { API } from '../consts';

import { CREATE_BUSINESS, GET_BUSINESS_BY_OWNER, GET_BUSINESS_BY_ID } from './types';

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

export const getBusinessByOwner = (id) => (dispatch) => {
	return axios
		.get(`${API}/business/owner/${id}`)
		.then((result) => {
			return dispatch({
				type: GET_BUSINESS_BY_OWNER,
				payload: result.data.business
			});
		})
		.catch((err) => {
			return dispatch({
				type: GET_BUSINESS_BY_OWNER,
				payload: err.response.data
			});
		});
};

export const getBusinessById = (id) => (dispatch) => {
	return axios
		.get(`${API}/business/${id}`)
		.then((result) => {
			return dispatch({
				type: GET_BUSINESS_BY_ID,
				payload: result.data.business
			});
		})
		.catch((err) => {
			return dispatch({
				type: GET_BUSINESS_BY_ID,
				payload: err.response.data
			});
		});
};
