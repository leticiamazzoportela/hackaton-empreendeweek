var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('procon_lista_processos');
});
router.post('/',(req, res, next) => {
  console.log(req.body.name);
})

module.exports = router;