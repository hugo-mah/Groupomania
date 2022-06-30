const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const env = require('dotenv').config();

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

mongoose.connect(process.env.REACT_APP_DATABASE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', userRoutes);
app.use('/', postRoutes);

module.exports = app;