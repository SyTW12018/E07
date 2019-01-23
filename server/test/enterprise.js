'use strict'

const chaiHttp = require('chai-http');

let Enterprise = require('../models/enterprise');
let User = require('../models/user');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for enterprise Controller', () => {
    let token;
    before(async () => {
        await Enterprise.deleteMany({});
        await User.deleteMany({});
        await chai.request(server).post('/api/register')
            .send({
                username: 'test',
                password: 'test',
                email: 'test@test.com'
            })

        let loginInfo = {
            email: 'test@test.com',
            password: 'test'
        }
        await chai.request(server).post('/api/login')
            .send(loginInfo)
            .then((res) => {
                token = res.body.token;
            });
    });

    let enterpriseId;
    describe('Register Test enterprise', () => {
        it('It should register the info of Test enterprise', (done) => {
            let testEnterprise = {
                nameEnterprise: "Test",
                place: "TestLand",
                description: "lorem ipsum"
            };
            chai.request(server).post('/api/newEnterprise')
                .set({ "authorization": token })
                .send(testEnterprise)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('enterprise');
                    res.body.should.have.property('message').eql('La empresa registrada satisfactoriamente');
                    enterpriseId = res.body.enterprise._id;
                    done();

                });
        });
    });

    describe('Delete Test Enterprise', (done) => {
        it('It should remove the test enterprise from database', (done) => {
            let testEnterpriseDel = {
                _id: enterpriseId
            };

            chai.request(server).delete('/api/deleteEnterprise')
                .set({ "authorization": token })
                .send(testEnterpriseDel)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('La empresa se ha eliminado');
                    done();
                });
        });
    });
});