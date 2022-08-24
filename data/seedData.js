const {faker} = require('@faker-js/faker');
const {db} = require('../server/Database');

const categories = [
  {
    id: 1,
    name: 'Home Goods'
  },
  {
    id: 2,
    name: 'Electronics'
  },
  {
    id: 3,
    name: 'Grocery'
  },
  {
    id: 4,
    name: 'Home Improvement'
  },
  {
    id: 5,
    name: 'Literature'
  }
]

;

const products = [...Array(100)].map(product => {
  const categoryIndex = Math.floor(Math.random()*5)
  return {
    productName: faker.commerce.productName(),
    stock: Math.floor(Math.random()*100),
    price: Number(faker.commerce.price(1, 200, 2)),
    categoryName: categories[categoryIndex].name,
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

