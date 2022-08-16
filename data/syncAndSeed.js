const {categories, products, orders } = require('./seedData');
const {db, models: {Order, Category, Product}} = require('../server/Database');

async function seed() {
  await db.sync({force:true});
  console.log('DB Synced!!');

  await Category.bulkCreate(categories).then(console.log('Categories Seeded'));
  await Product.bulkCreate(products).then(console.log('Products Seeded'));
  await Order.bulkCreate(orders).then(console.log('Orders Seeded'));
  console.log('Seeded Successfully');
}

module.exports = seed