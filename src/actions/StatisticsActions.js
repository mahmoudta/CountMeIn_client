// appointments/business/BusinessStatisticsHeader/5cedfa110a209a0eddbb2bbb

import axios from 'axios';
import { API } from '../consts';

import {
	GET_STATISTICS_HEADER,
	SET_STATISTICS_LOADING,
	SET_FLASH_MESSAGE,
	GLOBAL_STATISTICS,
	APPOINTMENTS_STATISTICS,
	SERVICES_STATISTICS,
	FOLLOWERS_STATISTICS
} from './types';
export const getStatisticsHeader = (business_id) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/business/statsHeader/${business_id}`)
		.then((result) => {
			return dispatch({
				type    : GET_STATISTICS_HEADER,
				payload : result.data.header
			});
		})
		.catch((err) => {
			dispatch({
				type    : SET_FLASH_MESSAGE,
				message : { type: 'error', text: err.response.data.error }
			});
			return dispatch({
				type    : GET_STATISTICS_HEADER,
				payload : {}
			});
		});
};

export const getSumarryPage = (business_id, range) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/business/sumarryPage/${business_id}/${range}`)
		.then((result) => {
			return dispatch({
				type    : GLOBAL_STATISTICS,
				payload : result.data.statistics
			});
		})
		.catch((err) => {
			return dispatch({
				type    : GLOBAL_STATISTICS,
				payload : {}
			});
		});
};

export const getAppointmentStats = (business_id) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/business/appointmentsStats/${business_id}`)
		.then((result) => {
			return dispatch({
				type    : APPOINTMENTS_STATISTICS,
				payload : result.data
			});
		})
		.catch((err) => {
			return dispatch({
				type    : APPOINTMENTS_STATISTICS,
				payload : {}
			});
		});
};

export const getServicesStats = (business_id) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/business/servicesStats/${business_id}`)
		.then((result) => {
			return dispatch({
				type    : SERVICES_STATISTICS,
				payload : result.data.results
			});
		})
		.catch((err) => {
			return dispatch({
				type    : SERVICES_STATISTICS,
				payload : {}
			});
		});
};
export const getFollowersStats = (business_id) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/business/followersStats/${business_id}`)
		.then((result) => {
			return dispatch({
				type    : FOLLOWERS_STATISTICS,
				payload : result.data.results
			});
		})
		.catch((err) => {
			return dispatch({
				type    : FOLLOWERS_STATISTICS,
				payload : []
			});
		});
};
export const setStatisticsLoading = () => {
	return {
		type : SET_STATISTICS_LOADING
	};
};
