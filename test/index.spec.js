const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const BlueBird = require('bluebird');
const User = require('../models/User');
chai.use(chaiHttp);

const setup = (...userObjects) => {
    return BlueBird.mapSeries(userObjects, user => {
        return chai.request(server)
            .post('/register')
            .send(user)
            .then(response => {
                return response.body;
            })
    })
}



describe('Velora Common Routes Tests', () => {

    it('should return the number of current users', async () => {
        const response = await chai.request(server).get('/')
        response.should.have.status(201);
        // response.body.should.eql(user23Prince)
        
    });
});

