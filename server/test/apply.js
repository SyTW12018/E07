'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let Apply = require('../models/apply');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

describe('Test for apply controllers', () => {
    before((done) => {
        Apply.deleteMany({}, (err) => {
            done();
        });
    });

    describe('Add new application letter', () => {
        it('Add new application', (done) => {
            let testApplication = {
                offerid: mongoose.ObjectId("1234abcd"),
                userid: mongoose.ObjectId("4321dcba"),
                description: "Lorem ipsum"
            }
            chai.request(server).post('/api/newApply')
                .send(testApplication)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('apply');
                    res.body.should.have.property('message');
                    done();
                });
        });
        it('Not add two times the same application', (done) => {
            let testApplication = {
                offerid: mongoose.ObjectId("1234abcd"),
                userid: mongoose.ObjectId("4321dcba"),
                description: "Lorem ipsum"
            }
            chai.request(server).post('/api/newApply')
                .send(testApplication)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('message');
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });

    describe('Discard application', () => {
        it('Delete apply from db', (done) => {
            let testApplication = {
                offerid: mongoose.ObjectId("1234abcd"),
                userid: mongoose.ObjectId("4321dcba"),
            }
            chai.request(server).del('/api/discardApply')
                .send(testApplication)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.should.have.property('apply');
                    done();
                });
        });
    });
})