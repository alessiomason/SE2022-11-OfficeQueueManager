'use strict';

/* Data Access Object (DAO) module for accessing riddles and answers */

const sqlite = require('sqlite3');

// open the database
const db = new sqlite.Database('oqm.db', (err) => {
	if (err) throw err;
});

// get all the services available on the office
exports.services = () => {
	return new Promise((resolve, reject) => {
	  const sql = 'SELECT * FROM SERVICE';
	  db.all(sql, [], (err, rows) => {
		if (err) {
		  reject(err);
		  return;
		}
		const service = rows.map((u) => ({ id: u.id, tagName: u.tagName, serviceTime: u.serviceTime }));
		resolve(service);
	  });
	});
}	

exports.deleteServiceIdByID = (serviceID) => {
	return new Promise((resolve, reject) => {
		db.run("DELETE FROM SERVICE WHERE id=?", [serviceID], (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
};

exports.getServiceIdByTag = (tagName) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM SERVICE WHERE tagName = ?';
		  db.get(sql, [tagName], (err, row) => {
			if (err) 
			  reject(err);
			else if (row === undefined)
			  resolve({error: 'Service not found.'});
			else {
			  const service = {id: row.id, tagName: row.tagName, serviceTime: row.serviceTime};
			  resolve(service);
			}
		});
	  });
};

exports.getLastTicketId = () => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM CLIENT ORDER BY idTicket DESC LIMIT 1';
		db.get(sql, [], (err, row) => {
			if (err) {
				reject(err);
				return;
			}
			const ticket = { idTicket: row.idTicket}
			resolve(ticket.idTicket);
		});
	});
}

exports.newTicket = (nameClient, idTicket, idService) => {
	return new Promise((resolve, reject) => {
		const sql = 'INSERT INTO CLIENT(name, idTicket, serviceType) VALUES(?, ?, ?)'
		db.run(sql, [nameClient, idTicket, idService], function (err) {  
		  if (err) {
			reject(err);
			return;
		  }
		  resolve(idTicket);
		});
	  });
}