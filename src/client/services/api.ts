export let Token: string = localStorage.getItem('token') || null;

export const setToken = (token: string) => {
	Token = token;
	localStorage.setItem('token', Token);
};

export const api = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json'
	};

	if (Token) {
		headers['Authorization'] = `Bearer ${Token}`;
	}

	try {
		let res = await fetch(uri, {
			method,
			headers,
			body: JSON.stringify(body)
        });
        if (res.ok) {
            return <T>(await res.json());
        } else {
            return null;
        }
	} catch (error) {
		console.log(error);
	}
};
