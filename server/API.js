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

    app.post('/api/newTicket',  async (req, res) => {

        const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

        // check if the name of the client is not empty
		if (req.body.name === ''){
			return res.status(422).json({ error: `The name of the client can not be empty.`});
		}
        const tagName = req.body.serviceType;
        const clientName = req.body.name;

        // check if the client already has a ticket...

        // from tagName, retrieve id of the service

        const service = await dao.getServiceIdByTag(tagName);

        // DATO IL NOME E IL SERVIZIO RICHIESTO, GLI ASSEGNO UN ID E UN TICKET

        const lastID = await dao.getLastTicketId();
        const idTicket = lastID + 1;
        
        try {
            const ticket = await dao.newTicket(clientName, idTicket, service.id);
            res.status(201).json(ticket).end();
        } catch (err) {
            res.status(500).json({ error: `Database error during the creation of ticket of the client ${clientName}.`});
        }
        
    });
}