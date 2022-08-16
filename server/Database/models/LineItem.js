const Sequelize = require('sequelize');
const db = require('../db');

const LineItem = db.define('line_item', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productPrice: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0.01
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    }
  },
  subtotal: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    get() {
      return ((this.productPrice * this.quantity).toFixed(2))
    }
  }
})

module.exports = LineItem