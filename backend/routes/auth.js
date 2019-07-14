const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new UserModel({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created',
            result: result
          });
        })
        .catch(error => {
          res.status(500).json({
            error: error
          });
        });
    });
});

router.post('/login', (req, res) => {
  let user;
  UserModel.findOne({email: req.body.email})
    .then(userData => {
      if (!userData) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      user = userData;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = jwt.sign(
        {email: user.email, userId: user._id},
        'windowswallowknowarrow',
        {expiresIn: '1h'}
      );
    })
    .catch(error => {
      res.status(401).json({
        message: 'Auth failed',
        error: error
      });
    });
});

module.exports = router;
