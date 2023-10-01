
const { getAll, create, remove, } = require('../controllers/images.controllers');
const express = require('express');
const upload = require('../utils/multer')

const routerImages = express.Router();

routerImages.route('/')
    .get(getAll)
    .post(upload.single('image') ,create);

routerImages.route('/:id')
    .delete(remove)

module.exports = routerImages;