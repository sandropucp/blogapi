var express = require('express');

var routes = function(Comment){
    var commentRouter = express.Router();

    var commentController = require('../Controllers/commentController')(Comment)
    commentRouter.route('/')
        .post(commentController.post)
        .get(commentController.get);

    commentRouter.use('/:commentId', function(req,res,next){
        Comment.findById(req.params.commentId, function(err,comment){
            if(err)
                res.status(500).send(err);
            else if(comment)
            {
                req.comment = comment;
                next();
            }
            else
            {
                res.status(404).send('no comment found');
            }
        });
    });
    commentRouter.route('/:commentId')
        .get(function(req,res){

            var returnComment = req.comment.toJSON();

            returnComment.links = {};
            var newLink = 'http://' + req.headers.host + '/api/comments/?author=' + returnPost.author;
            returnComment.links.FilterByThisAuthor = newLink.replace(' ', '%20');
            res.json(returnComment);

        })
        .put(function(req,res){
            req.comment.postid = req.body.postid;            
            req.comment.content = req.body.content;
            req.comment.author = req.body.author;            
            req.comment.status = req.body.status;
            req.comment.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.comment);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.comment[p] = req.body[p];
            }

            req.comment.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.comment);
                }
            });
        })
        .delete(function(req,res){
            req.comment.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return commentRouter;
};

module.exports = routes;