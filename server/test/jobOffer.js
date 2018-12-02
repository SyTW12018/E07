'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let User = require('../models/user');
let Offer = require('../models/jobOffer');
let server = require('../src/server');
let auth = require('../middlewares/authentication');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for Offer Controller', () => {
    //Clear Database
    let offerid;
    before((done) => {
        Offer.deleteMany({}, (err) => {
            done();
        });
    });

    describe('Register Test Offer', () => {
        it('It should register the info of Test Offer', (done) => {
            let testOffer = {
                nameEnterprise: "ESL",
                place: "COLOGNE",
                published: "13-12-2018",
                salary: 3000,
                exp: "None",
                kindOfJob: "full-time",
                description: "Lorem ipsum almendra"

            }
            chai.request(server).post('/api/newOffer')
                .send(testOffer)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('offers');
                    res.body.should.have.property('message').eql('La oferta de trabajo se ha registrado satisfactoriamente');
                    offerid = res.body.offers._id;
                    done();
                });

        });
    });

    describe('Delete Test Offer', (done) => {
        it('It should remove the test offer from database', (done) => {
            let testOfferDel = {
                ObjectId: offerid
            };
            chai.request(server).post('/api/deleteOffer')
                .send(testOfferDel)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Offer');
                    res.body.should.have.property('message').eql('La oferta de trabajo se ha eliminado');
                    done();
                });

        });

    });
});

describe('Full test User-Offer-Token', () => {

    before((done) => {
        Offer.deleteMany({}, (err) => {
        });
        User.deleteMany({}, (err) => {
        });

        done();

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
                password: "test",
                needToken: true
            }
            chai.request(server).post('/api/login')
                .send(testUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    describe('Add Offer With User And Token', () => {
        it('Get Token User Login', (done) => {
            let userIn = {
                email: "test@test.com",
                password: "test",
                needToken: false
            }
            
            console.log(userIn.auth)

            chai.request(server).post('/api/login')
                .send(userIn)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('user');
                    //res.body.should.have.property('token');
                    done();
                });
        });
    });
});