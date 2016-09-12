var postController = function(Post){

    var post = function(req, res){
        var post = new Post(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            post.save();
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
        Post.find(query, function(err,posts){

            if(err)
                res.status(500).send(err);
            else {
                var returnPosts = [];
                posts.forEach(function(element, index, array){
                    var newPost = element.toJSON();
                    newPost.links= {};
                    newPost.links.self = 'http://' + req.headers.host + '/api/posts/' + newPost._id
                    returnPosts.push(newPost);
                });
                res.json(returnPosts);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = postController;