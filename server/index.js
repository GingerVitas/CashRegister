const PORT = process.env.PORT || 8080;
const app = require('./app');
const syncAndSeed = require('../data/syncAndSeed');

const init = () => {
  try{
    await syncAndSeed();
    app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`));
  }
  catch(err){
    console.log(err)
  }
}

init();