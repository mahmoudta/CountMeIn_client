import { SET_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types';
import shortid from 'shortid';

export default function(state = [], action) {
	switch (action.type) {
		case SET_FLASH_MESSAGE:
			return [
				...state,
				// id: shortid.generate(),
				{
					type: action.message.type,
					text: action.message.text,
					action: action.message.action ? action.message.action : {}
				}
			];
		case DELETE_FLASH_MESSAGE:
			return [];

		default:
			return state;
	}
}
