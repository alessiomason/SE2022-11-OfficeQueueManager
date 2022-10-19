const APIURL = new URL('http://localhost:3001/api/');

async function getTicket(clientName, serviceType) {
	
	const ticket = JSON.stringify({
		name: clientName,
		serviceType: serviceType
	});

	// call: POST /api/newTicket
	return new Promise((resolve, reject) => {
		fetch(new URL('newTicket', APIURL), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: ticket,
		}).then((response) => {
			if (response.ok) {
				resolve(response.json());
			} else {
				// analyze the cause of error
				response.json()
					.then((message) => { reject(message); }) // error message in the response body
					.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
			}
		}).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
	
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
function deleteServiceType(id) {
	// call: DELETE /api/services/:serviceID
	return new Promise((resolve, reject) => {
	  fetch(new URL(`/services/${id}`, APIURL), {
		method: 'DELETE',
		credentials: 'include',
		headers: {
		  'Content-Type': 'application/json',
		},
	  }).then((response) => {
		if (response.ok) {
		  resolve(null);
		} else {
		  // analyze the cause of error
		  response.json()
			.then((message) => { reject(message); }) // error message in the response body
			.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
		}
	  }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
  }
  
  
  
  
  function addServiceType(service) {
	// call: POST /api/newService
  return new Promise((resolve, reject) => {
	  fetch(new URL('newService', APIURL), {
		method: 'POST',
		credentials: 'include',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({tagName:service.tagName,serviceTime:service.serviceTime}),
	  
	  }).then((response) => {
		if (response.ok) {
		  resolve(null);
		} else {
		  // analyze the cause of error
		  response.json()
			.then((message) => { reject(message); }) // error message in the response body
			.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
		}
	  }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
  
  
  
  }
  
  function updateServiceName(id,tagName) {
	// call: PUT /api/updateServiceName
	return new Promise((resolve, reject) => {
	  fetch(new URL('updateServiceName', APIURL), {
		method: 'PUT',
		credentials: 'include',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({id:id,tagName: tagName}),
	  }).then((response) => {
		if (response.ok) {
		  resolve(null);
		} else {
		  // analyze the cause of error
		  response.json()
			.then((obj) => { reject(obj); }) // error message in the response body
			.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
		}
	  }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
  }
  function updateServiceTime(id,serviceTime) {
	// call: PUT /api/updateServiceTime
	return new Promise((resolve, reject) => {
	  fetch(new URL('updateServiceTime', APIURL), {
		method: 'PUT',
		credentials: 'include',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({id:id,serviceTime: serviceTime}),
	  }).then((response) => {
		if (response.ok) {
		  resolve(null);
		} else {
		  // analyze the cause of error
		  response.json()
			.then((obj) => { reject(obj); }) // error message in the response body
			.catch(() => { reject({ error: "Cannot parse server response." }) }); // something else
		}
	  }).catch(() => { reject({ error: "Cannot communicate with the server." }) }); // connection errors
	});
  }
  
const API = { getTicket, login, logout, getUserInfo, getServices, deleteServiceType,addServiceType,updateServiceName,updateServiceTime };
export default API;