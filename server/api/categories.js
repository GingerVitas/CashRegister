const router = require('express').Router();
const {models: {Category}} = require('../Database');
module.exports = router;

router.get('/', async(req, res, next) => {
  try{
    const categories = await Category.findAll();
    res.json(categories)
  } catch(err){
    next(err)
  }
});

router.post('/', async(req, res, next) => {
  try{
    const category = await Category.create(req.body);
    res.send(category)
  }
  catch(err){
    next(err)
  }
});

router.delete('/:id', async(req, res, next) => {
  try{
    const category = Category.findByPk(req.params.id);
    await category.destroy();
    res.sendStatus(204);
  }
  catch(err){
    next(err)
  }
});

router.put('/:id', async(req, res, next) => {
  try {
    const category = Category.findByPk(req.params.id);
    await category.update(req.body);
    res.sendStatus(200);
  }
  catch(err){
    next(err)
  }
});