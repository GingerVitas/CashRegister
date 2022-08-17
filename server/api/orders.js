const router = require('express').Router();
const {models: {Order}} = require('../Database');
module.exports = router;

router.get('/', async(req, res, next) => {
  try{
    const orders = await Order.findAll();
    res.json(orders)
  } catch(err){
    next(err)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const order = await Order.create(req.body);
    res.send(order)
  }
  catch(err){
    next(err)
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const order = Order.findByPk(req.params.id);
    await order.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err)
  }
});

router.put('/:id', async(req, res, next) => {
  try {
    const order = Order.findByPk(req.params.id);
    await order.update(req.body);
    res.sendStatus(200);
  }
  catch(err){
    next(err)
  }
});