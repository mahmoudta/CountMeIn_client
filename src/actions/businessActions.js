import axios from 'axios';
import { API } from '../consts';
import { setCurrentUser } from './authActions';
import jwtDecode from 'jwt-decode';

import { setAuthorizationToken } from '../utils/setAuthorizationToken';

import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES,
	BUSNIESS_LOADING,
	FOLLOW_BUSINESS,
	UNFOLLOW_BUSINESS,
	SET_FLASH_MESSAGE,
	UPDATE_BUSINESS,
	SMART_ALGS_UPDATE,
	REVIEWS_OF_BUSINESS_PROFILE,
	REVIEW_LOADING
} from './types';
export const updateBusiness = (data) => (dispatch) => {
	dispatch(setBusinessLoading());
	return axios
		.put(`${API}/business/edit`, data)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type   : 'success',
					text   : 'Your Business updated successfully',
					action : {
						next : 'REDIRECT_TO_PAGE',
						path : `/business/view/${result.data.business._id}`
					}
				}
			});
			return dispatch({
				type    : UPDATE_BUSINESS,
				payload : result.data.business
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
			return dispatch({
				type    : UPDATE_BUSINESS,
				payload : {}
			});
		});
};
export const createNewBusiness = (data) => (dispatch) => {
	dispatch(setBusinessLoading());
	axios
		.post(`${API}/business/`, data)
		.then((result) => {
			const token = result.data.token;
			localStorage.removeItem('jwtToken');
			localStorage.setItem('jwtToken', token);
			setAuthorizationToken(token);
			dispatch(setCurrentUser({}));
			dispatch(setCurrentUser(jwtDecode(token)));

			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type   : 'success',
					text   : 'Your Business is waiting for You',
					action : {
						next : 'REDIRECT_TO_PAGE',
						path : `/business/view/${result.data.business._id}`
					}
				}
			});
			return dispatch({
				type    : CREATE_BUSINESS,
				payload : result.data.business
			});
		})
		.catch((err) => {
			dispatch({
				type    : CREATE_BUSINESS,
				payload : {}
			});
			return dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};

export const getBusinessByOwner = (id) => (dispatch) => {
	dispatch(setBusinessLoading());

	return axios
		.get(`${API}/business/owner/${id}`)
		.then((result) => {
			return dispatch({
				type    : GET_BUSINESS_BY_OWNER,
				payload : result.data.business
			});
		})
		.catch((err) => {
			return dispatch({
				type    : GET_BUSINESS_BY_OWNER,
				payload : {}
			});
		});
};

export const getBusinessCustomers = () => (dispatch) => {
	axios
		.get(`${API}/business/getAllCustomers`)
		.then((result) => {
			dispatch({
				type    : GET_CUREENT_BUSINESS_CUSTOMERS,
				payload : []
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_CUREENT_BUSINESS_CUSTOMERS,
				payload : err.response.data
			});
		});
};

export const UpdateSmartAlgorithmsSettings = (data) => (dispatch) => {
	dispatch(setBusinessLoading());
	axios
		.put(`${API}/business/UpdateSmartAlgorithmsSettings`, data)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type   : 'success',
					text   : 'Successfully updated',
					action : {
						next : 'REDIRECT_TO_PAGE',
						path : `/business/pages/mySchedule/${result.data.business._id}`
					}
				}
			});
			return dispatch({
				type    : SMART_ALGS_UPDATE,
				payload : result.data.business
			});
		})
		.catch((err) => {
			dispatch({
				type    : SMART_ALGS_UPDATE,
				payload : {}
			});
			return dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};
export const getBusinessServices = (id) => (dispatch) => {
	axios
		.get(`${API}/business/services/${id}`)
		.then((result) => {
			dispatch({
				type    : GET_CUREENT_BUSINESS_SERVICES,
				payload : result.data.services
			});
		})
		.catch((err) => {
			dispatch({
				type    : GET_CUREENT_BUSINESS_SERVICES,
				payload : {}
			});
		});
};

export const getBusinessById = (id) => (dispatch) => {
	dispatch(setBusinessLoading());
	return axios
		.get(`${API}/business/${id}`)
		.then((result) => {
			return dispatch({
				type    : GET_BUSINESS_BY_ID,
				payload : result.data.business
			});
		})
		.catch((err) => {
			return dispatch({
				type    : GET_BUSINESS_BY_ID,
				payload : {}
			});
		});
};
export const followBusiness = (business_id) => (dispatch) => {
	return axios
		.put(`${API}/business/follow`, { business_id })
		.then((result) => {
			return dispatch({
				type    : FOLLOW_BUSINESS,
				payload : result.data.isFollower
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};

export const unFollowBusiness = (business_id) => (dispatch) => {
	axios
		.put(`${API}/business/unfollow`, { business_id })
		.then((result) => {
			dispatch({
				type    : UNFOLLOW_BUSINESS,
				payload : result.data.isFollower
			});
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'success', text: 'you can Follow Back any Time' }
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
		});
};
export const getReviewsForProfilePage = (business_id, page) => (dispatch) => {
	dispatch({
		type    : REVIEW_LOADING,
		payload : true
	});
	axios
		.get(`${API}/business/reviews/${business_id}/${page}`)
		.then((result) => {
			dispatch({
				type    : REVIEWS_OF_BUSINESS_PROFILE,
				payload : result.data.reviews
			});
		})
		.catch((err) => {
			dispatch({
				type    : REVIEWS_OF_BUSINESS_PROFILE,
				message : {}
			});
		});
};

export const setBusinessLoading = (loading = true) => {
	return {
		type    : BUSNIESS_LOADING,
		payload : loading
	};
};
