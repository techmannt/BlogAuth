import { Token, api } from './api';

export const shouldIStayOrShouldIGoNow = async () => {
	if (Token) {
		let result = await api('/auth/tokens/validate');
		if (result?.msg === 'loggedIn') {
			//token has been validated by server
			return true;
		} else {
			//token is not validated by server
			return false;
		}
	} else {
		//no token in localStorage, aka it's null
		return false;
	}
};