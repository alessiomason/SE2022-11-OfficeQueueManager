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

    // create a new ticket
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

        // from tagName, retrieve id of the service

        const service = await dao.getServiceIdByTag(tagName);

        // GIVEN NAME OF THE CLIENT AND TYPE OF SERVICE, DB ASSIGNE ID_CLIENT AND ID_TICKET

        const lastID = await dao.getLastTicketId();
        const idTicket = lastID + 1;
        
        try {
            const ticket = await dao.newTicket(clientName, idTicket, service.id);
            res.status(201).json(ticket).end();
        } catch (err) {
            res.status(500).json({ error: `Database error during the creation of ticket of the client ${clientName}.`});
        }
        
    });

    // get all tickets
    app.get('/api/tickets', async (req, res) => {
		try {
			const tickets = await dao.tickets();
			res.status(200).json(tickets);
		}
		catch (err) {
			res.status(500).end();
		}
	});

    // delete all tickets
    app.delete('/api/deleteTickets', async (req, res) => {
        try {
            await dao.deleteAllTickets();
            res.status(204).end();

        } catch (e) {
            res.status(500).end();
        }
    });
}