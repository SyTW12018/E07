'use strict'

let Post = require('../models/post');

        fuction addPost (req,res){

                let newPost = new Post();
                let params = req.body;
                console.log(params);



                newPost.creator = params.creator;
                newPost.postType = params.postType;

                newPost.save((err, userSaved) => {
                        if (err) {
                        res.status(500).send({ message: "Error en el servidor al registrar el Post", Error: err });
                        }
                        else {
                        if (!userSaved) {
                        res.status(404).send({ message: "El Post  no se ha registrado" });
                        }
                        else {
                        res.status(200).send({ message: "El post no se ha  registrado satisfactoriamente", user: userSaved });
                         }
                    });

        }


        fuction deletePost(req,res){

                newPost.remove({
                        creator: req.params.creator
                        postType: req.params.postType
                },function(error){
                  if(error){
                      res.send('Error al intentar eliminar el personaje.');
                    }
                  else{
                        }
                });

             }                                                                                                                               1,1      Comienzo
	
	module.exports = {newPost,deletePost };
