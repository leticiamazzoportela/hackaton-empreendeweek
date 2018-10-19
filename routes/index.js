var express = require('express');
var router = express.Router();
const { Processos } = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title:"xd"});
});
router.get('/processo/:id', function(req, res, next) {

  let processoId = req.params.id;

  // Acessar o banco e pesquisar processo
  Processos.findById(processoId, {
    attributes: ['idProcessos', 'historiaOcorrencia', 'status', 'docApresentados', 'dataHora', 'formaAtendimento', 'tipoAtendimento', 'processo', 'ClienteIdClientes'],
  }).then(_processo => {
    if (_processo) {
      //res.status(200).json(_processo);
      res.render('procon_processo', {sucesso: true, processo: _processo});
    }
    else {
      res.render('procon_processo', {sucesso: false, msg: 'Processo não encontrado.'});
    }
  }).catch(ex => {
    console.log('Processo não pode ser consultado!');
    console.error(ex);
    res.render('procon_processo', { sucesso: false, msg: 'Algo saiu errado!' });
  });
});

router.post('/',(req, res, next) => {
  console.log(req.body.name);
})

module.exports = router;
