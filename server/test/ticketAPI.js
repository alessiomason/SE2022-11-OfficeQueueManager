const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const app = require('../server');
let agent = chai.request.agent(app);

describe('test ticket APIs', () => {
    deleteAllTickets();
    getTickets(200, 0);
    createTicket(201, "Marco", "service #2");
    getTickets(200, 1);
    createTicket(201, "Giovanni", "service #2");
    createTicket(201, "Paola", "service #1");
    createTicket(201, "Sara", "service #3");
    getTickets(200, 4);
})

function deleteAllTickets() {
    it('clean db for ticket APIs', function (done) {

        agent.delete('/api/deleteTickets')
            .then(function (res) {
                res.should.have.status(204);
                done();
            });
    });
}

function getTickets(expectedHTTPStatus, length) {
    it('getting tickets from the system', function (done) {
        agent.get('/api/tickets')
            .then(function (r) {
                r.should.have.status(expectedHTTPStatus);
                r.body.length.should.have.equal(length);
                done();
            }).catch(done);
    });
}

function createTicket(expectedHTTPStatus, nameClient, serviceType) {
    it('creating a ticket in the system', function (done) {
        let ticket = {
            name: nameClient,
            serviceType: serviceType
        };
        agent.post('/api/newTicket')
            .send(ticket)
            .then(function (r1) {
                r1.should.have.status(expectedHTTPStatus);
                agent.get('/api/tickets')
                    .then(function (r2) {
                        if (r1.status != 422) {
                            if (r2.body.length == 0) {
                                r2.should.have.status(500);
                            }
                        }
                        r2.should.have.status(200);
                        done();
                    }).catch(done);
            }).catch(done);
    });
}