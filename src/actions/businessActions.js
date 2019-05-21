import axios from 'axios';
import { API } from '../consts';

import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES,
	BUSNIESS_LOADING,
	FOLLOW_BUSINESS,
	UNFOLLOW_BUSINESS,
	SET_FLASH_MESSAGE
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
	axios
		.get(`${API}/business/owner/${id}`)
		.then((result) => {
			dispatch({
				type: GET_BUSINESS_BY_OWNER,
				payload: result.data.business
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_BUSINESS_BY_OWNER,
				payload: err.response.data
			});
		});
};

export const getBusinessCustomers = () => (dispatch) => {
	axios
		.get(`${API}/business/getAllCustomers`)
		.then((result) => {
			dispatch({
				type: GET_CUREENT_BUSINESS_CUSTOMERS,
				payload: result.data.customers
			});
		})
		.catch((err) => {
			dispatch({
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
	dispatch(setBusinessLoading());
	axios
		.get(`${API}/business/${id}`)
		.then((result) => {
			dispatch({
				type: GET_BUSINESS_BY_ID,
				payload: result.data.business
			});
		})
		.catch((err) => {
			dispatch({
				type: GET_BUSINESS_BY_ID,
				payload: {}
			});
		});
};
export const followBusiness = (business_id) => (dispatch) => {
	dispatch(setBusinessLoading());
	axios
		.put(`${API}/business/follow`, { business_id })
		.then((result) => {
			dispatch({
				type: FOLLOW_BUSINESS,
				payload: result.data.isFollower
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_FLASH_MESSAGE,
				message: { type: 'error', text: err.response.data.error }
			});
			dispatch(setBusinessLoading());
		});
};

export const unFollowBusiness = (business_id) => (dispatch) => {
	dispatch(setBusinessLoading());
	console.log(business_id);
	axios
		.put(`${API}/business/unfollow`, { business_id })
		.then((result) => {
			dispatch({
				type: UNFOLLOW_BUSINESS,
				payload: result.data.isFollower
			});
			dispatch({
				type: SET_FLASH_MESSAGE,
				message: { type: 'success', text: 'you can Follow Back any Time' }
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_FLASH_MESSAGE,
				message: { type: 'error', text: err.response.data.error }
			});
			dispatch(setBusinessLoading(false));
		});
};

export const setBusinessLoading = (loading = true) => {
	return {
		type: BUSNIESS_LOADING,
		payload: loading
	};
};
