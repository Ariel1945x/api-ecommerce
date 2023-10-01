
const Category = require("./Category")
const Product = require("./Product")
const Images = require("./Images")
const Cart = require('./Cart')
const User = require('./User')
const Purchase = require('./Purchase')

Category.hasMany(Product)
Product.belongsTo(Category)

Product.hasMany(Images)
Images.belongsTo(Product)

User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

User.hasMany(Purchase)
Purchase.belongsTo(User)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)