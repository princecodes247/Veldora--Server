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
        "username": "Prince",
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
        "username": "David",
        "user_id": 20,
        "email": "davidlancer@gmail.com",
        "country": "Nigeria",
        "accountType": 0,
        "password": "another"
    } 

    beforeEach(async () => {
        
    })

    afterEach(async () => {
        // await db.user.deleteMany({});
    })

    it.skip('should create a new user account', async () => {
        const response1 = await chai.request(server).post('/register').send(user23Prince)
        response1.should.have.status(201);
        delete response1.body.id;
        response1.body.should.eql(user23Prince)
        const response2 = await chai.request(server).post('/register').send(user20David)
        response2.should.have.status(201);
        delete response2.body.id;
        response2.body.should.eql(user20David)
    });

    it.skip('should fetch all the projects the user is affiliated with', async () => {
        const response = await chai.request(server).get('/user/projects')
        response.should.have.status(200);
        response.body.should.eql([]);
    })

    it.skip('should fetch a single project if user is not authorised to view project', async () => {
        // const [project] = await setup(user23AAC);
        const response = await chai.request(server).get(`/user/projects/${project.id}`)
        response.should.have.status(200);
        response.body.should.eql(project);
    })

    it.skip('should get 404 if the project ID does not exist', async () => {
        const response = await chai.request(server).get(`/user/projects/32323`)
        response.should.have.status(404);
        response.text.should.eql('ID not found');
    })

    it.skip('should get 405 if user is not authorised to view project', async () => {
        const response = await chai.request(server).put(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })


    it.skip('should delete a project if user is not authorised', async () => {
        const [project] = await setup(user23AAC);
        const response = await chai.request(server).delete(`/user/projects/${project.id}`)
        response.should.have.status(405);
    })
    
    it.skip('should get 405 for a put request to /projects/:id', async () => {
        const [project] = await setup(user23AAC);
        const response = await chai.request(server).put(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })

    it.skip('should get 405 for a patch request to /projects/:id', async () => {
        const [project] = await setup(user23AAC);
        const response = await chai.request(server).patch(`/user/projects/${project.id}`).send(user23ABX)
        response.should.have.status(405);
    })
});
