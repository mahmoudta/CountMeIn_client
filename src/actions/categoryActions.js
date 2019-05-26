import axios from 'axios';
import { API } from '../consts';

import {
	CREATE_CATEGORY,
	GET_ALL_CATEGORIES,
	CATEGORY_LOADING,
	CREATE_CATEGORY_ERROR,
	DELETE_CATEGORY,
	SET_FLASH_MESSAGE
} from './types';

export const createCategory = (name) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.post(`${API}/category/`, name)
		.then((result) => {
			return dispatch({
				type: CREATE_CATEGORY,
				payload: result.data.success
			});
		})
		.catch((err) => {
			return dispatch({
				type: CREATE_CATEGORY_ERROR,
				payload: err.response.data.error
			});
		});
};

export const addService = (service) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.post(`${API}/category/service`, service)
		.then((result) => {
			return dispatch({
				type: CREATE_CATEGORY,
				payload: result.data.success
			});
		})
		.catch((err) => {
			return dispatch({
				type: CREATE_CATEGORY_ERROR,
				payload: err.response.data.error
			});
		});
};

export const getAllCategories = () => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.get(`${API}/category/`)
		.then((result) => {
			return dispatch({
				type: GET_ALL_CATEGORIES,
				payload: result.data.categories
			});
		})
		.catch((err) => {
			return dispatch({
				type: GET_ALL_CATEGORIES,
				payload: { message: 'caant get the categories' }
			});
		});
};

export const deleteCategory = (id) => (dispatch) => {
	dispatch(setCategoryLoading());
	return axios
		.delete(`${API}/category/${id}`)
		.then((result) => {
			dispatch({
				type: SET_FLASH_MESSAGE,
				message: { type: 'success', text: 'Successfully deleted' }
			});

			return dispatch({
				type: DELETE_CATEGORY,
				payload: result.data.category
			});
		})
		.catch((err) => {
			return dispatch({
				type: SET_FLASH_MESSAGE,
				message: { type: 'error', text: err.response.data.error }
			});
			//TODO
		});
};

export const setCategoryLoading = () => {
	return {
		type: CATEGORY_LOADING
	};
};
