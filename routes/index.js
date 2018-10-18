var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:"xd"});
});
router.post('/',(req, res, next) => {
  console.log("Ola");
  res.send("Ola")
})

module.exports = router;
