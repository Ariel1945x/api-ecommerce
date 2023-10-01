
const { getAll, create  } = require('../controllers/cart.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const routerPurchase = express.Router();

routerPurchase.route('/')
    .get(verifyJWT ,getAll)
    .post(verifyJWT ,create);

module.exports = routerPurchase;