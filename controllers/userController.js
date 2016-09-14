var userController = function(User){

    var post = function(req, res){
        var user = new User(req.body);

        console.log(req.body);
        if(!req.body.name){
            res.status(400);
            res.send('Name is required');
        }
        else {
            user.save();
            res.status(201);
            res.send(user);
        }
    }

    var get = function(req,res){
        var query = {};

        if(req.query.email)
        {
            query.email = req.query.email;
        }
        User.find(query, function(err,users){
            if(err)
                res.status(500).send(err);
            else {
                var returnUsers = [];
                users.forEach(function(element, index, array){
                    var newUser = element.toJSON();
                    newUser.links= {};
                    newUser.links.self = 'http://' + req.headers.host + '/api/users/' + newUser._id
                    returnUsers.push(newUser);
                });
                res.json(returnUsers);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = userController;