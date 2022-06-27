const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userId: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    usersLiked: {type: Array},
    likes: {type: Number},
    date: {type: Number}
});

module.exports = mongoose.model('Post', postSchema);