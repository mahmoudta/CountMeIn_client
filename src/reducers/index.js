import { combineReducers } from 'redux';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import businessReducer from './businessReducer';
import appointmentReducer from './appointmentReducer';
import flashMessageReducer from './flashMessageReducer';

export default combineReducers({
	auth: authReducer,
	category: categoryReducer,
	business: businessReducer,
	appointment: appointmentReducer,
	flashMessage: flashMessageReducer
});
