const APIURL = new URL('http://localhost:3001/api/');

async function login(credentials) {
	let response = await fetch(new URL('sessions', APIURL), {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});
	if (response.ok) {
		const user = await response.json();
		return user;
	} else {
		const errDetail = await response.json();
		throw errDetail.message;
	}
}

async function logout() {
	await fetch(new URL('sessions/current', APIURL), { method: 'DELETE', credentials: 'include' });
}

async function getUserInfo() {
	const response = await fetch(new URL('sessions/current', APIURL), { credentials: 'include' });
	const userInfo = await response.json();
	if (response.ok) {
		return userInfo;
	} else {
		throw userInfo;  // an object with the error coming from the server
	}
}

const API = { login, logout, getUserInfo };
export default API;