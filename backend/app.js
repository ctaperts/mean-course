const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

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
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.use('/api/posts', postsRoutes);

module.exports = app;
