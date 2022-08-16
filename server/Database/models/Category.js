const Sequelize = require('sequelize');
const db = require('../db');

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  categoryName: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Category