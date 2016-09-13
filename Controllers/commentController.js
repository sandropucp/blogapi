var commentController = function(Comment){

    var post = function(req, res){
        var comment = new Comment(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Content is required');
        }
        else {
            comment.save();
            res.status(201);
            res.send(post);
        }
    }

    var get = function(req,res){

        var query = {};

        if(req.query.author)
        {
            query.author = req.query.author;
        }
        Comment.find(query, function(err,comments){

            if(err)
                res.status(500).send(err);
            else {
                var returnComments = [];
                comments.forEach(function(element, index, array){
                    var newComment = element.toJSON();
                    newComment.links= {};
                    newComment.links.self = 'http://' + req.headers.host + '/api/comments/' + newComment._id
                    returnComments.push(newComment);
                });
                res.json(returnComments);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = commentController;