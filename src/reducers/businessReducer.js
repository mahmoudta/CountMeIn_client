import {
	CREATE_BUSINESS,
	GET_BUSINESS_BY_OWNER,
	GET_BUSINESS_BY_ID,
	GET_CUREENT_BUSINESS_CUSTOMERS,
	GET_CUREENT_BUSINESS_SERVICES,
	BUSNIESS_LOADING,
	FOLLOW_BUSINESS,
	UNFOLLOW_BUSINESS,
	UPDATE_BUSINESS,
	SMART_ALGS_UPDATE,
	REVIEWS_OF_BUSINESS_PROFILE,
	REVIEW_LOADING
} from '../actions/types';
// import isEmpty from 'lodash/isEmpty';

const initialState = {
	myBusiness    : {},
	business      : {},
	loading       : false,
	success       : '',
	reviews       : {},
	reviewLoading : false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_BUSINESS:
			return {
				...state,
				success : ' business successfully added',
				loading : false
			};

		case UPDATE_BUSINESS:
			return {
				...state,
				myBusiness : action.payload,
				loading    : false
			};

		case GET_BUSINESS_BY_OWNER:
			return {
				...state,
				myBusiness : action.payload,
				loading    : false
			};
		case GET_BUSINESS_BY_ID:
			return {
				...state,
				business : action.payload,
				loading  : false
			};
		case GET_CUREENT_BUSINESS_CUSTOMERS:
			return {
				...state,
				customers : action.payload,
				loading   : false
			};
		case SMART_ALGS_UPDATE:
			return {
				...state,
				myBusiness : action.payload,
				loading    : false
			};
		case GET_CUREENT_BUSINESS_SERVICES:
			return {
				...state,
				businessServices : action.payload,
				loading          : false
			};

		case FOLLOW_BUSINESS:
			const newBusiness = { ...state.business };
			newBusiness.isFollower = action.payload;
			newBusiness.followers = Number(newBusiness.followers) + 1;
			return {
				...state,
				business : newBusiness,
				loading  : false
			};
		case UNFOLLOW_BUSINESS:
			const BusinessEdit = { ...state.business };
			BusinessEdit.isFollower = action.payload;
			BusinessEdit.followers = Number(BusinessEdit.followers) - 1;
			return {
				...state,
				business : BusinessEdit,
				loading  : false
			};

		case REVIEWS_OF_BUSINESS_PROFILE: {
			return {
				...state,
				reviews       : action.payload,
				reviewLoading : false
			};
		}
		case REVIEW_LOADING: {
			return {
				...state,
				reviewLoading : action.payload
			};
		}
		case BUSNIESS_LOADING: {
			return {
				...state,
				loading : action.payload
			};
		}

		default:
			return state;
	}
}
