var express = require('express');

var routes = function(Post){
    var postRouter = express.Router();

    var postController = require('../Controllers/postController')(Post)
    postRouter.route('/')
        .post(postController.post)
        .get(postController.get);

    postRouter.use('/:postId', function(req,res,next){
        Post.findById(req.params.postId, function(err,post){
            if(err)
                res.status(500).send(err);
            else if(post)
            {
                req.post = post;
                next();
            }
            else
            {
                res.status(404).send('no post found');
            }
        });
    });
    postRouter.route('/:postId')
        .get(function(req,res){

            var returnPost = req.post.toJSON();

            returnPost.links = {};
            var newLink = 'http://' + req.headers.host + '/api/posts/?author=' + returnPost.author;
            returnPost.links.FilterByThisAuthor = newLink.replace(' ', '%20');
            res.json(returnPost);

        })
        .put(function(req,res){
            req.post.title = req.body.title;
            req.post.author = req.body.author;
            req.post.content = req.body.content;
            req.post.status = req.body.status;
            req.post.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.post);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.post[p] = req.body[p];
            }

            req.post.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.book);
                }
            });
        })
        .delete(function(req,res){
            req.post.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return postRouter;
};

module.exports = routes;