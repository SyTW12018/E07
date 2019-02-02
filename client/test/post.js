'use strict'

const chaiHttp = require('chai-http');

let User = require('../src/server/models/user');
let Post = require('../src/server/models/post');
let Enterprise = require('../src/server/models/enterprise')
let server = require('../src/server/src/server');

const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);
describe('Test for offer Controller', () => {
    let token;
    let userid;
    let postid;
    let enterpriseid;
    before(async () => {
        await Post.deleteMany({});
        await User.deleteMany({});
        await Enterprise.deleteMany({});
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
                userid = res.body.user._id;
            });

        let testEnterprise = {
            nameEnterprise: "Lolo",
            place: "TestLand",
            description: "lorem ipsum"
        };
        await chai.request(server).post('/api/newEnterprise')
            .set({ "authorization": token })
            .send(testEnterprise).then(res => {
                enterpriseid = res.body.enterprise._id;
            })
    });

    describe('Register Test Post', () => {
        it('It should register the info of User Test Post', (done) => {
            let testPost = {
                body: "hplaquehace",
                creator: userid,
                onModel: "User"
            }
            chai.request(server).post('/api/addPost')
                .set({ authorization: token })
                .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('post');
                    res.body.should.have.property('message').eql('El post se ha  registrado satisfactoriamente');
                    postid = res.body.post._id;
                    done();
                });
        });
        it('It should register the info of Enterprise Test Post', (done) => {
            let testPost = {
                body: "hplaquehace",
                creator: enterpriseid,
                onModel: "enterprise"
            }
            chai.request(server).post('/api/addPost')
                .set({ authorization: token })
                .send(testPost)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('post');
                    res.body.should.have.property('message').eql('El post se ha  registrado satisfactoriamente');
                    done();
                });
        });
    });

    describe('Get Posts', (done) => {
        it('Get all posts', (done) => {
            chai.request(server).get('/api/posts/1').set({ authorization: token }).send().end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('posts');
                res.body.should.have.property('total').eql(2);
                res.body.should.have.property('message').eql('Post encontrados');
                for (let i in res.body.posts) {
                    if (res.body.posts[i].onModel == "User") {
                        res.body.should.have.nested.property(`posts[${i}].creator.username`);
                    } else {
                        res.body.should.have.nested.property(`posts[${i}].creator.nameEnterprise`);
                    }
                }
                done();
            })
        });
        it('Get user post', (done) => {
            let url = `/api/posts/${userid}/1`
            chai.request(server).get(url).set({ authorization: token }).send().end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('posts');
                for (let i in res.body.posts) {
                    res.body.should.have.nested.property(`posts[${i}].creator.username`);
                }
                done();
            })
        });
        it('Get enterprise post', (done) => {
            let url = `/api/posts/${enterpriseid}/1`
            chai.request(server).get(url).set({ authorization: token }).send().end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('posts');
                for (let i in res.body.posts) {
                    res.body.should.have.nested.property(`posts[${i}].creator.nameEnterprise`);
                }
                done();
            })
        });
    });

    describe('Delete Post', (done) => {
        it('Remove Post from db', (done) => {
            let testPostDel = {
                ObjectId: postid
            }
            chai.request(server).post('/api/deletePost')
                .set({ authorization: token })
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

