const router = require('express').Router();
const {models: {Category}} = require('../Database');
module.exports = router;

router.get('/', async(req, res, next) => {
  try{
    const products = await Category.findAll();
    res.json(orders)
  } catch(err){
    next(err)
  }
});