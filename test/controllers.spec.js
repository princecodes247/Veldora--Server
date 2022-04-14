const assert = require('chai').assert;
const AuthController = require('../controllers/auth.controller');
const ProjectController = require('../controllers/project.controller');
const UserController = require('../controllers/user.controller');


describe('Auth Controller Test', async function(){
   
    it('Returns true if user is authorized', ()=> {
        
    })
    it('Returns false if user is  authorized', ()=> {
        
    })

    it('Returns true if user is admin', ()=> {
        
    })
    it('Returns false if user is admin', ()=> {
        
    })
});

describe('Project Controller Test', async function(){
   
    it('Returns all projects in database belonging to a particular user', ()=> {
        
    })

    it('Returns user with the given user ID', ()=> {
        
    })
    
});

describe('User Controller Test', async function(){
   
    it('Returns all users in database', ()=> {
        
    })

    it('Returns user with the given user ID', ()=> {
        
    })
    
});