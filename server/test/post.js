'use strict'

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');

let User = require('../models/user');
let Post = require('../models/post');
let server = require('../src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for Post  Controller', () => {
    // let token;
    let postid;
    before(/*async()*/(done) => {
        Post.deleteMany({}, (err) => {
            done();

            /*  
     await Post.deleteMany({});
     await User.deleteMany({});
     await chai.request(server).post('api/register')

          .send({
              username: 'test',
              password: 'test',
              email: 'test@test.com'
          })
      let loginInfo = {
          email :  'test@test.com',
          email: 'test@test.com'
          needToken: true
      }
      await chai.request(server).post('/api/login')
      .send(loginInfo)
      .then((res) => {
          token = res.body.token;
          postid = res.body.ObjectId;

      }*/


        });
    });
    describe('Register Test Post', () => {
        it('It should register the info of Test Post', (done) => {
            let testPost = {
                body: "hplaquehace",
                creator: "41224d776a326fb40f000001",
                postType: "Prueba"
            }

            chai.request(server).post('/api/addPost')

                .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('posts');
                    res.body.should.have.property('message').eql('El post  se ha  registrado satisfactoriamente');
                    postid = res.body.posts._id;
                    done();
                });
        });
    });

    describe('Delete Post', (done) => {

        it('Remove Post from db', (done) => {
            let testPostDel = {
                ObjectId: postid
            }
            chai.request(server).post('/api/deletePost')
                .send(testPostDel)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('post');
                    res.body.should.have.property('message');
                    done();
                });
        });
    });
});

