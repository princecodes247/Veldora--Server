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

describe('Velora Project Tests', () => {
    
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

    it('should fetch all the projects the user is affiliated with', async () => {
        const response = await chai.request(server).get('/user/projects')
        response.should.have.status(200);
        response.body.should.eql([]);
    })

    it('should fetch a single project if user is not authorised to view project', async () => {
        // const [trade] = await setup(user23AAC);
        const response = await chai.request(server).get(`/user/projects/${project.id}`)
        response.should.have.status(200);
        response.body.should.eql(project);
    })

    it('should get 404 if the project ID does not exist', async () => {
        const response = await chai.request(server).get(`/user/projects/32323`)
        response.should.have.status(404);
        response.text.should.eql('ID not found');
    })

    it('should get 405 if user is not authorised to view project', async () => {
        const response = await chai.request(server).put(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })


    it('should delete a project if user is not authorised', async () => {
        const [trade] = await setup(user23AAC);
        const response = await chai.request(server).delete(`/user/projects/${project.id}`)
        response.should.have.status(405);
    })
    
    it('should get 405 for a put request to /trades/:id', async () => {
        const [trade] = await setup(user23AAC);
        const response = await chai.request(server).put(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })

    it('should get 405 for a patch request to /trades/:id', async () => {
        const [trade] = await setup(user23AAC);
        const response = await chai.request(server).patch(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })
});
