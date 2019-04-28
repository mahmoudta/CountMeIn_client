import axios from 'axios';
import { API } from '../consts';

import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES
} from './types';

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

export const getBusinessCustomers = () => (dispatch) => {
	axios
		.get(`${API}/business/getAllCustomers`)
		.then((result) => {
			return dispatch({
				type: GET_CUREENT_BUSINESS_CUSTOMERS,
				payload: result.data.customers
			});
		})
		.catch((err) => {
			return dispatch({
				type: GET_CUREENT_BUSINESS_CUSTOMERS,
				payload: err.response.data
			});
		});
};

export const getBusinessServices = (id) => (dispatch) => {
	axios
		.get(`${API}/business/services/${id}`)
		.then((result) => {
			dispatch({
				type: GET_CUREENT_BUSINESS_SERVICES,
				payload: result.data.services
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_CUREENT_BUSINESS_SERVICES,
				payload: {}
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
