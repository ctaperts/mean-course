const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.post('', (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save()
    .then(result => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: result._id
      });
    });
});

router.put('/:id', (req, res) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({_id: req.params.id }, post).then(result => {
      // console.log(result);
      res.status(200).json({ message: result.nModified + ' Document updated successful' });
    });
});


router.get('', (req, res) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      });
    });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({message: 'Post not found'});
      }
    });
});

router.delete('/:id', (req, res) => {
  Post.deleteOne({ _id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({ message: 'Post deleted' });
    });
});

module.exports = router;
