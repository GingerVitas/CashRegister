const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  lineItems: {
    type: Sequelize.JSONB
  },
  total: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.lineItems.reduce((acc, lineItem) => {
        return parseFloat((acc + lineItem.subtotal).toFixed(2))
      }, 0))
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: Sequelize.DATEONLY,
  }
});

module.exports = Order