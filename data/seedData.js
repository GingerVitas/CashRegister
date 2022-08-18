const {faker} = require('@faker-js/faker');
const {db} = require('../server/Database');

const categories = [
  {
    id: 1,
    categoryName: 'Home Goods'
  },
  {
    id: 2,
    categoryName: 'Electronics'
  },
  {
    id: 3,
    categoryName: 'Grocery'
  },
  {
    id: 4,
    categoryName: 'Home Improvement'
  },
  {
    id: 5,
    categoryName: 'Literature'
  }
]

;

const products = [...Array(100)].map(product => {
  const categoryIndex = Math.floor(Math.random()*5)
  return {
    productName: faker.commerce.productName(),
    stock: Math.floor(Math.random()*100),
    price: Number(faker.commerce.price(1, 500, 2)),
    categoryId: categories[categoryIndex].id
  }
});

const lineItems = [...Array(25)].map(lineItem => {
  const productIndex = Math.floor(Math.random()*50)
  return {
    productName: products[productIndex].productName,
    productPrice: products[productIndex].price,
    quantity: Math.ceil(Math.random()*5),
    taxRate: .05,
    get subtotal() { return ((this.productPrice * this.quantity * (1+ this.taxRate)).toFixed(2))*1 }
  }
})

const orders = [
  {
    lineItems: lineItems.slice(0,4),
    complete: true
  },
  {
    lineItems: lineItems.slice(5,9),
    complete: true
  },
  {
    lineItems: lineItems.slice(10,14),
    complete: true
  },
  {
    lineItems: lineItems.slice(15,19),
    complete: true
  },
  {
    lineItems: lineItems.slice(20, 24),
    complete: true
  }
]

module.exports = {
  categories,
  products,
  orders
}

