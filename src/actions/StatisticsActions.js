// appointments/business/BusinessStatisticsHeader/5cedfa110a209a0eddbb2bbb

import axios from 'axios';
import { API } from '../consts';

import { GET_STATISTICS_HEADER, SET_STATISTICS_LOADING, SET_FLASH_MESSAGE } from './types';
export const getStatisticsHeader = (business_id) => (dispatch) => {
	dispatch(setStatisticsLoading());
	return axios
		.get(`${API}/appointments/business/BusinessStatisticsHeader/${business_id}`)
		.then((result) => {
			return dispatch({
				type    : GET_STATISTICS_HEADER,
				payload : result.data.statistics
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

export const setStatisticsLoading = () => {
	return {
		type : SET_STATISTICS_LOADING
	};
};
