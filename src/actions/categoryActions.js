import axios from 'axios';
import { API } from '../consts';

import isEmpty from 'lodash/isEmpty';

import {
	CREATE_CATEGORY,
	GET_ALL_CATEGORIES,
	CATEGORY_LOADING,
	CREATE_CATEGORY_ERROR,
	DELETE_CATEGORY,
	SET_FLASH_MESSAGE,
	DELETE_SERVICE
} from './types';

export const createCategory = (name) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.post(`${API}/category/`, name)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type   : 'success',
					text   : 'Successfully deleted',
					action : {
						next : 'REDIRECT_TO_DASHBAORD'
					}
				}
			});
			return dispatch({
				type    : CREATE_CATEGORY,
				payload : ''
			});
		})
		.catch((err) => {
			dispatch(setCategoryLoading(false));

			return dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type : 'error',
					text : err.response.data.error
						? err.response.data.error
						: 'Some error accourd while adding category'
				}
			});
		});
};

export const addService = (service) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.post(`${API}/category/service`, service)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type   : 'success',
					text   : 'Successfully deleted',
					action : {
						next : 'REDIRECT_TO_DASHBAORD'
					}
				}
			});
			return dispatch({
				type    : CREATE_CATEGORY,
				payload : ''
			});
		})
		.catch((err) => {
			dispatch(setCategoryLoading(false));

			return dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type : 'error',
					text : `${err.response.data.error} ? ${err.response.data
						.error}: 'Some error accourd while adding service'`
				}
			});
		});
};

export const getAllCategories = () => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.get(`${API}/category/`)
		.then((result) => {
			return dispatch({
				type    : GET_ALL_CATEGORIES,
				payload : result.data.categories
			});
		})
		.catch((err) => {
			dispatch(setCategoryLoading(false));

			return dispatch({
				type    : GET_ALL_CATEGORIES,
				payload : []
			});
		});
};

export const deleteCategory = (id) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.delete(`${API}/category/${id}`)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'success', text: 'Successfully deleted' }
			});

			return dispatch({
				type    : DELETE_CATEGORY,
				payload : result.data.category
			});
		})
		.catch((err) => {
			dispatch(setCategoryLoading(false));
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type : 'error',
					text : `${err.response.data.error} ? ${err.response.data.error}: 'Some error accourd while deletig'`
				}
			});
		});
};

export const deleteService = (id) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.delete(`${API}/category/service/${id}`)
		.then((result) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'success', text: 'Successfully deleted' }
			});

			return dispatch({
				type    : DELETE_SERVICE,
				payload : result.data.category
			});
		})
		.catch((err) => {
			const error = !isEmpty(err.response.data) ? err.response.data.error : 'Some error accourd while delete';
			dispatch(setCategoryLoading(false));
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : {
					type : 'error',
					text : error
				}
			});
		});
};

export const setCategoryLoading = (loading = true) => {
	return {
		type    : CATEGORY_LOADING,
		payload : loading
	};
};
