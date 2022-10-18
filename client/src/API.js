const APIURL = new URL('http://localhost:3001/api/');

async function getTicket(clientName) {
	// temporarily, I return a random number between 1 and 99
	return Math.floor(Math.random() * 99) + 1;
}

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

async function getServices() {
	// call /api/services
	const response = await fetch(new URL('services', APIURL));
	const services = await response.json();
	if (response.ok) {
		return services.map((u) => ({ id: u.id, tagName: u.tagName, serviceTime: u.serviceTime }))
	} else {
		throw services;
	}
}

const API = { getTicket, login, logout, getUserInfo, getServices };
export default API;