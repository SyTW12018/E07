'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let Apply = require('../models/apply');
let User = require('../models/user');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

describe('Test for apply controllers', () => {
    let token;
    before(function (done) {
        Apply.deleteMany({});
        User.deleteMany({});
        chai.request(server).post('/api/register')
            .send({
                username: 'test',
                password: 'test',
                email: 'test@test.com'
            })
            .end((err, res) => {
                console.log(res.body);
                //done();
            });

        let loginInfo = {
            email: 'test@test.com',
            password: 'test',
            needToken: true
        }

        chai.request(server).post('/api/login')
            .send(loginInfo)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(res.body);
                    token = res.body.token;
                    //console.log(res.body.token);
                    //console.log("token", token);
                    done();
                }

            });
    });

    describe('Add new application letter', function () {
        it('Add new application', function (done) {
            let testApplication = {
                offerid: "41224d776a326fb40f000001",
                userid: "41224d776a326fb40f000002",
                description: "Lorem ipsum"
            }
            //console.log("token", token);
            chai.request(server).post('/api/newApply')
                .set({ "authorization": token })
                .send(testApplication)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('apply');
                    res.body.should.have.property('message');
                    done();
                });
        });
        it('Not add two times the same application', function (done) {
            let testApplication = {
                offerid: "41224d776a326fb40f000001",
                userid: "41224d776a326fb40f000002",
                description: "Lorem ipsum"
            }
            //console.log("token", token);
            chai.request(server).post('/api/newApply')
                .set({ "authorization": token })
                .send(testApplication)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.have.property('message');
                    res.body.should.have.property('errors');
                    done();
                });
        });
    });

    describe('Discard application', function () {
        it('Delete apply from db', function (done) {
            let testApplication = {
                offerid: "41224d776a326fb40f000001",
                userid: "41224d776a326fb40f000002",
            }

            chai.request(server).del('/api/discardApply')
                .set({ "authorization": token })
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