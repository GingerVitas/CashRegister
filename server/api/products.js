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

router.post('/', async(req, res, next) => {
  try{
    const product = await Product.create(req.body);
    res.send(product)
  }
  catch(err){
    next(err)
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const product = Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err)
  }
});

router.put('/:id', async(req, res, next) => {
  try {
    const product = Product.findByPk(req.params.id);
    await product.update(req.body);
    res.sendStatus(200);
  }
  catch(err){
    next(err)
  }
});