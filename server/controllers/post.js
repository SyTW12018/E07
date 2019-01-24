'use strict'

let Post = require('../models/post');
let moment = require('moment');

function addPost(req, res) {

        let newPost = new Post();
        let params = req.body;

        newPost.creator = params.creator;
        newPost.onModel = params.onModel;
        newPost.body = params.body;
        newPost.createAt = moment().unix();

        newPost.save((err, postSaved) => {
                if (err) {
                        res.status(500).send({ message: "Error en el servidor al registrar el Post", Error: err });
                }
                else {
                        if (!postSaved) {
                                res.status(404).send({ message: "El Post no se ha registrado" });
                        }
                        else {
                                res.status(200).send({ message: "El post se ha  registrado satisfactoriamente", post: postSaved });
                        }
                }

        });
}

function deletePost(req, res) {
        Post.findOneAndDelete({ _Id: req.params.ObjectId }, (err, postDeleted) => {
                if (err) {
                        res.status(500).send({ message: "Error Servidor", Error: err });
                }
                else {
                        if (!postDeleted) {
                                res.status(404).send({ message: "El Post no existe" });
                        }
                        else {
                                res.status(200).send({ message: "El Post se ha eliminado", post: postDeleted });
                        }
                }
        });
}

function getAllPosts(req, res) {
        let params = req.params;
        let options = {
                page: Number(params.page),
                limit: 7,
                populate: 'creator',
                sort: { createAt: -1 }
        }
        Post.paginate({}, options, (err, result) => {
                let docs = result.docs.map((curr) => {
                        if (curr.onModel == "User") {
                                return {
                                        _id: curr._id,
                                        onModel: curr.onModel,
                                        body: curr.body,
                                        createAt: curr.createAt,
                                        creator: {
                                                username: curr.creator.username
                                        }
                                }
                        } else {
                                return {
                                        _id: curr._id,
                                        onModel: curr.onModel,
                                        body: curr.body,
                                        createAt: curr.createAt,
                                        creator: {
                                                nameEnterprise: curr.creator.nameEnterprise
                                        }
                                }
                        }

                })
                if (err) {
                        res.status(500).send({ message: "Error en el servidor", Error: err });
                }
                else {
                        if (!result.total) {
                                res.status(404).send({ message: "Sé el primero en publicar algo!" });
                        }
                        else {
                                res.status(200).send({ message: "Post encontrados", posts: docs, total: result.total })
                        }
                }
        })
}

function getPostsOfUser(req, res) {
        let params = req.params;
        let options = {
                page: params.page,
                limit: 7,
                populate: 'creator',
                sort: { createAt: -1 }
        }
        Post.paginate({ creator: params.id }, options, (err, result) => {
                let docs = result.docs.map((curr) => {
                        if (curr.onModel == "User") {
                                return {
                                        _id: curr._id,
                                        onModel: curr.onModel,
                                        body: curr.body,
                                        createAt: curr.createAt,
                                        creator: {
                                                username: curr.creator.username
                                        }
                                }
                        } else {
                                return {
                                        _id: curr._id,
                                        onModel: curr.onModel,
                                        body: curr.body,
                                        createAt: curr.createAt,
                                        creator: {
                                                nameEnterprise: curr.creator.nameEnterprise
                                        }
                                }
                        }

                })
                if (err) {
                        res.status(500).send({ message: "Error en el servidor", Error: err });
                }
                else {
                        if (!result.total) {
                                res.status(404).send({ message: "Este usuario no ha publicado nada." })
                        }
                        else {
                                res.status(200).send({ message: "Post encontrados", posts: docs, total: result.total })
                        }
                }
        })
}

module.exports = { addPost, deletePost, getPostsOfUser, getAllPosts };
