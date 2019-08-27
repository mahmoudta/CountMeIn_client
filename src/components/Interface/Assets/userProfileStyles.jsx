import { cardTitle, grayColor } from '../Assets/Styles';

const userProfileStyles = {
	cardTitle,
	cardIconTitle: {
		...cardTitle,
		marginTop: '15px',
		marginBottom: '0px',
		'& small': {
			fontSize: '80%',
			fontWeight: '400'
		}
	},
	cardCategory: {
		marginTop: '10px',
		color: grayColor[0] + ' !important',
		textAlign: 'center'
	},
	description1: {
		color: grayColor[0]
	},
	updateProfileButton: {
		float: 'right'
	}
};
export default userProfileStyles;
