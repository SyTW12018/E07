'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let User = require('../models/user');
let Offer = require('../models/jobOffer');
let server = require('../src/server');

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

