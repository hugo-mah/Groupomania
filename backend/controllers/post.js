const Post = require('../models/Post');

exports.createPost = (req, res, next) => {
    let post = new Post ({
        userId: req.body.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        description: req.body.description,
        likes: 0,
        usersLiked: []
    })
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
}

exports.getPost = (req, res, next) => {
    Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ error }));
}