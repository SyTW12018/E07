'use strict'

let Post = require('../models/post');

function addPost(req, res) {

        let newPost = new Post();
        let params = req.body;

        newPost.creator = params.creator;
        newPost.postType = params.postType;
        newPost.body = params.body;

        newPost.save((err, postSaved) => {
                if (err) {
                        res.status(500).send({ message: "Error en el servidor al registrar el Post", Error: err });
                }
                else {
                        if (!postSaved) {
                                res.status(404).send({ message: "El Post  no se ha registrado" });
                        }
                        else {
                                res.status(200).send({ message: "El post  se ha  registrado satisfactoriamente", posts: postSaved });
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

module.exports = { addPost, deletePost };
