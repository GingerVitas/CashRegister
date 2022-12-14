const db = require('./db');
const Category = require('./models/Category');
const Order = require('./models/Order');
const Product = require('./models/Product');

Product.belongsTo(Category, {targetKey: 'name', foreignKey:'categoryName'});
Category.hasMany(Product);

module.exports = {
  db,
  models: {
    Category,
    Order,
    Product
  }
};