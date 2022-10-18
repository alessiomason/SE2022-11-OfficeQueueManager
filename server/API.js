const dao = require('./dao'); // module for accessing the DB
const user_dao = require('./user-dao'); // module for accessing the users in the DB
const { check, validationResult } = require('express-validator'); // validation middleware

module.exports.useAPIs = function useAPIs(app, isLoggedIn) {

    // get all the services
    app.get('/api/services', async (req, res) => {
		try {
			const services = await dao.services();
			res.status(200).json(services);
		}
		catch (err) {
			res.status(500).end();
		}
	});


}