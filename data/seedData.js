const {faker} = require('@faker-js/faker');
const {db} = require('../server/Database');

const categories = [...Array(5)].map((category, idx) => (
  {
    id: idx+1,
    categoryName: faker.commerce.department()
  }
));

const products = [...Array(50)].map(product => {
  const categoryIndex = Math.floor(Math.random()*5)
  return {
    productName: faker.commerce.productName(),
    stock: Math.floor(Math.random()*100),
    price: faker.commerce.price(1, 500, 2),
    categoryId: categories[categoryIndex].id
  }
});

const lineItems = [...Array(25)].map(lineItem => {
  const productIndex = Math.floor(Math.random()*50)
  return {
    productName: products[productIndex].productName,
    productPrice: products[productIndex].price,
    quantity: Math.floor(Math.random()*6),
    taxRate: .05,
    subtotal: (this.productPrice * this.quantity * (1+ this.taxRate))
  }
})

const orders = [
  {
    lineItems: [lineItems.slice(0,4)],
    complete: true
  },
  {
    lineItems: [lineItems.slice(5,9)],
    complete: true
  },
  {
    lineItems: [lineItems.slice(10,14)],
    complete: true
  },
  {
    lineItems: [lineItems.slice(15,19)],
    complete: true
  },
  {
    lineItems: [lineItems.slice(20, 24)],
    complete: true
  }
]

module.exports = {
  categories,
  products,
  orders
}

