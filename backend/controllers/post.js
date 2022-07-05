const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res, next) => {
  if(req.file === undefined){
    let post = new Post ({
      userId: req.body.userId,
      imageUrl: null,
      description: req.body.description,
      likes: 0,
      usersLiked: [],
      date: Date.now()
    })
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }
  else{
    let post = new Post ({
      userId: req.body.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      description: req.body.description,
      likes: 0,
      usersLiked: [],
      date: Date.now()
    })
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
  }
}

exports.getPost = (req, res, next) => {
  Post.find()
  .then((posts) => {
    posts.sort((a, b) => b.date - a.date);
    res.status(200).json(posts)
  })
  .catch(error => res.status(404).json({ error }));
}

exports.likePost = (req, res, next) => {
    Post.findOne({_id: req.body.data._id})
    .then((post) =>{
        if(req.body.like === 1){
            let usersLiked = post.usersLiked;
            const presentLike = (element) => element === req.body.userId;
            let findLike = usersLiked.some(presentLike);
            if(findLike == true){
              res.status(400).json({message: 'Like déja ajouté'});
            }
            else{
              usersLiked.push(req.body.userId);
              let likes = usersLiked.length;
              Post.updateOne({_id: req.body.data._id}, {usersLiked, likes})
              .then(() => res.status(201).json({message: 'Like ajouté'}))
              .catch(() => res.status(400))
            }
        }
        else if(req.body.like === 0){
            let usersLiked = post.usersLiked;
            let likes = usersLiked.length;
            for(let i in usersLiked){
              if(req.body.userId == usersLiked[i]){
                usersLiked.splice(i, 1);
                likes = usersLiked.length;
                Post.updateOne({_id: req.body.data._id}, {usersLiked, likes})
                .then(() => res.status(201).json({message: 'Like retiré'}))
                .catch(() => res.status(400))
              }
            }
          }
    })
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.body.data._id })
  .then(post => {
    if((post.userId == req.auth.userId) || (req.auth.userId === process.env.REACT_APP_ADMIN_USERID)){
      if(post.imageUrl !== null){
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.body.data._id })
          .then(() => res.status(201).json({ message: 'Post supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        })
      }
      else{
        Post.deleteOne({ _id: req.body.data._id })
        .then(() => res.status(201).json({ message: 'Post supprimé !'}))
        .catch(error => res.status(400).json({ error }));
      }
    } 
    else{
      res.status(401).json({message: 'Utilisateur non authentifié'});
    }
  })
  .catch(error => res.status(500).json({ error }));
}


exports.modifyPost = (req, res, next) => {
Post.findOne({ _id: req.params.id })
.then((post) => {
    if(req.auth.userId === post.userId || req.auth.userId === process.env.REACT_APP_ADMIN_USERID){
        if (req.file) {
            Post.findOne({ _id: req.params.id })
            .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const postObject = {
                userId: post.userId,
                description: req.body.description,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                }
                Post.updateOne({ _id: req.params.id }, { ...postObject})
                .then(() => res.status(201).json({ message: 'Post modifié!' }))
                .catch(error => res.status(400).json({ error }));
            })
            })
            .catch(error => res.status(500).json({ error }));
        } else {
            const postObject = { 
              userId: post.userId,
              description: req.body.description,
            };
            Post.updateOne({ _id: req.params.id }, { ...postObject})
            .then(() => res.status(201).json({ message: 'Sauce modifiée!' }))
            .catch(error => res.status(400).json({ error }));
        }
    }
    else{
    res.status(401).json({message: 'Utilisateur non authentifié'})
    }
})
.catch(error => res.status(500).json({ error }))
};

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
  .then((post) => {
    res.status(200).json(post)
  })
  .catch(error => res.status(404).json({ error }));
}