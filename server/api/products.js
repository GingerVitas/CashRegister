const router = require('express').Router();
const {models: {Product}} = require('../Database');
module.exports = router;

router.get('/', async(req, res, next) => {
  try{
    const products = await Product.findAll();
    res.json(products)
  } catch(err){
    next(err)
  }
});