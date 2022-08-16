const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    type: Sequelize.UUIDV4,
    primaryKey: true,
  },
  lineItems: {
    type: Sequelize.JSONB
  },
  total: {
    type: Sequelize.DECIMAL(10,2),
    set(value) {
      return (this.lineItems.reduce((acc, lineItem) => {
        return acc + lineItem.subtotal
      }, 0))
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Order