'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let User = require('../models/user');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

describe('Test for User Controller', () => {
    let token;
    //Clear Database
    before((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });


    describe('Register Test User', () => {
        it('It should register the info of Test User', (done) => {
            let testUser = {
                username: "test",
                email: "test@test.com",
                password: "test"
            }
            chai.request(server).post('/api/register')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    res.body.should.have.property('message').eql('Usuario registrado satisfactoriamente');
                    done();
                });
        });
        it('It should not register a user that shares email or username', (done) => {
            let testUser = {
                username: "test",
                email: "test@test.com",
                password: "test"
            }
            chai.request(server).post('/api/register')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });

    describe('Login Test User', () => {
        it('It should get the info of the Test User', (done) => {
            let testUser = {
                email: "test@test.com",
                password: "test"
            }

            chai.request(server).post('/api/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.nested.property('user.username');
                    res.body.should.have.nested.property('user.email');
                    res.body.should.have.nested.property('user.role');
                    res.body.should.have.nested.property('user.name');
                    res.body.should.have.nested.property('user.surname');
                    done();
                });
        });
    });

    describe('Get New Token Of Test User', () => {
        it('It should get the token of Test User', (done) => {
            let testUser = {
                email: "test@test.com",
                password: "test"
            }
            chai.request(server).post('/api/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    token = res.body.token;
                    done();
                });
        });
    });
    describe('Obtención de la informacion del usuario', () => {
        it('getUser function', (done) => {
            chai.request(server).get('/api/user/test')
                .set({ 'authorization': token })
                .send({})
                .end((error, res) => {
                    if (error) {
                        throw error;
                    }
                    else {
                        res.body.should.be.a('Object');
                        res.body.should.have.property('user');
                        res.body.should.have.nested.property('user.username');
                        res.body.should.have.nested.property('user.email');
                        res.body.should.have.nested.property('user.name');
                        res.body.should.have.nested.property('user.surname');
                    }
                    done();
                });
        });
        it('getUser para un usuario que no existe', (done) => {
            chai.request(server).get('/api/user/test2')
                .set({ "authorization": token })
                .send({})
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.should.have.status(404)
                        res.body.should.have.property('message');
                        res.body.should.have.property('message').eql('No existe el usuario solicitado');
                    }
                    done();
                });
        });
    });
});