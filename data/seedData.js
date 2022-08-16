const {faker} = require('@faker-js/faker');
const {db} = require('../server/Database');

const categories = [...Array(5)].map(category => (
  {
    categoryName: faker.commerce.department()
  }
));

const products = [...Array(50)].map(product => {
  const categoryIndex = Math.floor(Math.random()*6)
  return {
    productName: faker.commerce.productName(),
    stock: Math.floor(Math.random()*100),
    price: faker.commerce.price(1, 500, 2, '$'),
    categoryId: categories[categoryIndex].id
  }
});

const lineItems = [...Array(25)].map(lineItem => {
  const productIndex = Math.floor(Math.random()*51)
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
    
  }
]



