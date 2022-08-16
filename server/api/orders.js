const router = require('express').Router();
const {models: {Order}} = require('../Database');
module.exports = router;

router.get('/', async(req, res, next) => {
  try{
    const products = await Order.findAll();
    res.json(orders)
  } catch(err){
    next(err)
  }
});