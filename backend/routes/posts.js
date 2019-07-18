const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');
const postController = require('../controllers/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post('', checkAuth, multer({storage: storage}).single('image'), postController.postCreate);
router.put('/:id', checkAuth, multer({ storage: storage }).single('image'), postController.postEdit);
router.get('', postController.postGet);
router.get('/:id', postController.postGetOne);
router.delete('/:id', checkAuth, postController.postDelete);

module.exports = router;
