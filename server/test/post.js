'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let Post = require('../models/post');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
	describe('Test for Post  Controller',()=>{
    //Clear Database
    before((done)=>{
        Post.deleteMany({}, (err)=>{
            done();
        });
    });
	 describe('Register Test User',()=>{
       		 it('It should register the info of Test User', (done)=>{
           		 let testPost = {
                	creator: "test",
                	postType: "Prueba"			
           	 }

		 chai.request(server).post('/api/newPost')
                .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('post');
                    res.body.should.have.property('message');
                    done();
                });
        });

		 it('Not add two times the same post', (done) => {
            let testApplication = {
                creator: "test",
                 postType: "Prueba"
		}     
		chai.request(server).post('/api/newPost')
                .send(testPost)
                .end((err, res) => {                
                    res.should.have.status(500);
                    res.body.should.have.property('message');
                    res.body.should.have.property('errors');
                    done();
                });
            });
    	});
		describe('Discard application', () => {
       
        it('Delete Post from db', (done) => {
            let testPost = {
               	creator: "test",
                postType: "Prueba"
            }
     	   chai.request(server).del('/api/discardPost')
                .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.should.have.property('post');
                    done();
                });
        });
    });
})
             
