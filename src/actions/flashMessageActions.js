import { SET_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from './types';

export const setFlashMessage = (message) => (dispatch) => {
	dispatch({
		type: SET_FLASH_MESSAGE,
		message
	});
};

export function deleteFlashMessage() {
	return {
		type: DELETE_FLASH_MESSAGE
	};
}
