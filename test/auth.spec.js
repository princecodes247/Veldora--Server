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



describe('Velora Authentication Tests', () => {
    
    const user23Prince = {
        "userName": "Prince",
        "user_id": 23,
        "email": "princecodes247@gmail.com",
        "country": "Nigeria",
        "accountType": 0,
        "password": "firstTest"
    } 
    // role: Number,
    // verified: { type: Number, default: 0},
    // proMember: { type: Boolean, default: false},
    // confirmationCode: Number

    const user20David = {
        "userName": "David",
        "user_id": 20,
        "email": "davidlancer@gmail.com",
        "country": "Nigeria",
        "accountType": 0,
        "password": "another"
    } 

    beforeEach(async () => {
        // await Trades.sync();
    })

    afterEach(async () => {
        // await db.user.deleteMany({});
    })

    it('should create a new user account', async () => {
        const response1 = await chai.request(server).post('/register').send(user23Prince)
        response1.should.have.status(201);
        delete response1.body.id;
        response1.body.should.eql(user23Prince)
        const response2 = await chai.request(server).post('/register').send(user20David)
        response2.should.have.status(201);
        delete response2.body.id;
        response2.body.should.eql(user20David)
    });
});
