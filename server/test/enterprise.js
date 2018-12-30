'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let Enterprise = require('../models/enterprise');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for enterprise Controller', () => {

    before(async () => {
        await Enterprise.deleteMany({});
    });

    let enterpriseId;

    describe('Register Test enterprise', () => {

        it('It should register the info of Test enterprise', (done) => {

            let testEnterprise = {
                place: "Tenerife",
                created: "13/12/1994",
                description: "lorem ipsum"

            };

            chai.request(server).post('/api/newEnterprise')
                .send(testEnterprise)
                .end((err, res) => {

                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('enterprise');
                    res.body.should.have.property('message').eql('La empresa registrada satisfactoriamente');
                    enterpriseId = res.body.enterprise._id;
                    console.log(res.body.enterprise._id);
                    done();

                });

        });
    });

    describe('Delete Test Enterprise', (done) => {
        it('It should remove the test enterprise from database', (done) => {
            let testEnterpriseDel = {
                _id: enterpriseId
            };

            console.log(testEnterpriseDel._id);

            chai.request(server).delete('/api/deleteEnterprise')
                .send(testEnterpriseDel)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('La empresa se ha eliminado');
                    done();
                });

        });

    });



});