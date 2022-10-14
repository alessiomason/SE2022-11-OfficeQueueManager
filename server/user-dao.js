'use strict';

/* Data Access Object (DAO) module for accessing users */

const sqlite = require('sqlite3');
const crypto = require('crypto');

// open the database
const db = new sqlite.Database('riddles.db', (err) => {
	if (err) throw err;
});

// get the user identified by {id}
exports.getUserById = (id) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT * FROM users WHERE id=?`;

		db.get(sql, [id], (err, row) => {
			if (err) {
				reject(err);
				return;
			}

			if (row == undefined) {
				resolve({ error: 'Utente non trovato.' });
			} else {
				const riddle = {
					id: row.id,
					email: row.email,
					name: row.name
				};

				resolve(riddle);
			}
		});
	});
};

exports.getUser = (email, password) => {
	return new Promise((resolve, reject) => {
		const sql = 'SELECT * FROM users WHERE email = ?';
		db.get(sql, [email], (err, row) => {
			if (err) { reject(err); }
			else if (row === undefined) { resolve(false); }
			else {
				const user = { id: row.id, username: row.email, name: row.name };

				const salt = row.salt;
				crypto.scrypt(password, salt, 32, (err, hashedPassword) => {
					if (err) reject(err);

					const passwordHex = Buffer.from(row.hash, 'hex');

					if (!crypto.timingSafeEqual(passwordHex, hashedPassword))
						resolve(false);
					else resolve(user);
				});
			}
		});
	});
};

