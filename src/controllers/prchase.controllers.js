
const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({ include: [Product], where: { userId: req.user.id}  });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const carts = await Cart.findAll({
        where: { userId: req.user.id },
        attributes: [ 'userId', 'productId', 'quantity' ],
        raw: true
    })
    const result = await Purchase.bulkCreate(carts);
    await Cart.destroy({ where: { userId: req.user.id} })
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create,
}