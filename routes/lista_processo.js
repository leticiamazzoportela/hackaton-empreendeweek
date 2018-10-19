var express = require('express');
var router = express.Router();
const { Processos } = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('procon_lista_processos');
  
  Processos.findAll({
    attributes: ['idProcessos', 'status', 'dataHora', 'ClienteIdClientes'],
  }).then(_processos =>{
    if (_processos){
      //res.status(200).json(_processos);
      res.render('procon_lista_processos', {sucesso: true, processos: _processos});
      //res.status(200).json({sucesso: true, processos: _processos})
    }
    else{
      res.render('procon_lista_processos', {sucesso: false, msg: 'Não há clientes.'})
    }
  }).catch(ex => {
    console.log(ex);
    res.render('procon_lista_processos', {sucesso: false, msg: 'Erro interno.'})
  })
});
router.post('/',(req, res, next) => {
  console.log(req.body.name);
})

module.exports = router;