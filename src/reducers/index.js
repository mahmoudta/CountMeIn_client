import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import businessReducer from './businessReducer';

export default combineReducers({
	auth: authReducer,
	category: categoryReducer,
	business: businessReducer
});
