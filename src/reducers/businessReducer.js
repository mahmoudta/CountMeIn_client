import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES,
	BUSNIESS_LOADING,
	FOLLOW_BUSINESS,
	UNFOLLOW_BUSINESS
} from '../actions/types';
// import isEmpty from 'lodash/isEmpty';

const initialState = {
	myBusiness: {},
	customers: [],
	businessServices: [],
	business: {},
	loading: false,
	success: ''
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_BUSINESS:
			return {
				...state,
				success: ' business successfully added',
				loading: false
			};

		case GET_BUSINESS_BY_OWNER:
			return {
				...state,
				myBusiness: action.payload,
				loading: false
			};
		case GET_BUSINESS_BY_ID:
			return {
				...state,
				business: action.payload,
				loading: false
			};
		case GET_CUREENT_BUSINESS_CUSTOMERS:
			return {
				...state,
				customers: action.payload,
				loading: false
			};
		case GET_CUREENT_BUSINESS_SERVICES:
			return {
				...state,
				businessServices: action.payload,
				loading: false
			};

		case FOLLOW_BUSINESS:
			const newBusiness = { ...state.business };
			newBusiness.isFollower = action.payload;
			newBusiness.followers = Number(newBusiness.followers) + 1;
			return {
				...state,
				business: newBusiness,
				loading: false
			};
		case UNFOLLOW_BUSINESS:
			const BusinessEdit = { ...state.business };
			BusinessEdit.isFollower = action.payload;
			BusinessEdit.followers = Number(BusinessEdit.followers) - 1;
			return {
				...state,
				business: BusinessEdit,
				loading: false
			};

		case BUSNIESS_LOADING: {
			return {
				...state,
				loading: action.payload
			};
		}

		default:
			return state;
	}
}
