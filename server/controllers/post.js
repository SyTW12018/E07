'use strict'

let Post = require('../models/post');

        function addPost (req,res){

                let newPost = new Post();
                let params = req.body;
                console.log(params);



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
                        res.status(200).send({ message: "El post no se ha  registrado satisfactoriamente", post: postSaved });
                         }
                    }

                });
        
        }

        function deletePost(req,res){

                Post.remove({
                        creator: req.params.creator
    
               },function(error){
                  if(error){
                      res.send('Error al intentar eliminar el post.');
                    }
                  else{
                        }
                });

             }                                                                                                                          
        
	module.exports = {addPost,deletePost };
