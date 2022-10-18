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