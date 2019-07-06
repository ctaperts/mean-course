const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb+srv://colby:pMkOBX6SN0tJMPKJ@cluster0-gylxp.mongodb.net/mean-course?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-allow-Headers',
    'Origin, X-requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: '123', title:'First post!', content: 'content 1'},
    { id: '213123', title:'Second post!', content: 'content 2'},
    { id: '121233', title:'Third post!', content: 'content 3'}
  ];
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;
