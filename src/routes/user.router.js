
const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT ,getAll)
    .post(create);

routerUser.route('/login')
    .post(login)

routerUser.route('/:id')
    .get(verifyJWT ,getOne)
    .delete(verifyJWT ,remove)
    .put(verifyJWT ,update);

module.exports = routerUser;