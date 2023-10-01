const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const routerImages = require('./images.router');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser)
router.use('/categories', routerCategory)
router.use('/products', routerProduct)
router.use('/products_img', routerImages)
router.use('/carts', routerCart)
router.use('/purchases', routerPurchase)

module.exports = router;