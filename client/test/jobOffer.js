'use strict'

const chaiHttp = require('chai-http');

let User = require('../src/server/models/user');
let Offer = require('../src/server/models/jobOffer');
let server = require('../src/server/src/server');
let moment = require('moment');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for offer Controller', () => {
    let token;
    let offerid;
    let enterpriseid;
    before(async () => {
        await Offer.deleteMany({});
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

        await chai.request(server).post('/api/newEnterprise')
            .set({ "authorization": token }).send({
                nameEnterprise: "test",
                place: "Test Land",
                description: "Lorem ipsum"
            }).then((res) => {
                enterpriseid = res.body.enterprise._id;
            })
    });

    describe('Register Test Offer', () => {
        it('It should register the info of Test Offer', (done) => {
            let testOffer = {
                enterprise: enterpriseid,
                place: "test",
                published: moment().unix(),
                salary: 3000,
                exp: "None",
                kindOfJob: "full-time",
                description: "Lorem ipsum almendra"

            }
            chai.request(server).post('/api/newOffer')
                .set({
                    "authorization": token
                })
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
                _id: offerid
            };

            chai.request(server).delete('/api/deleteOffer')
                .set({
                    "authorization": token
                })
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