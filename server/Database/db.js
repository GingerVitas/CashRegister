const Sequelize = require('sequelize');

const database = process.env.NODE_ENV || 'cashRegister';

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
};

if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${database}`, {
    config,
    dialect: 'postgres',
    logging: false
  }
)

module.exports = db