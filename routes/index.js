var express = require('express');
var router = express.Router();
const { Processos, Clientes } = require("../models");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


router.post('/', async function(req, res, next){
  const { email, password } = req.body;

  if( true ){ // Seria testado os dados de login
    let cliente = await Clientes.find({
      where: {
        Email: email,
      }
    });

    // Teria uma senha criptografada
    if(cliente && cliente.password == password){
      // Deve gerar o token e retornar
      res.render('index', { /* Token: token */ });
    }
    else {
      next(createError(400, {
        message: "email ou senha incorretos!\nVerifique e tente novamente!",
      }));
    }
  }
  next(createError(400, {
    message: "dados invalidos!\nVerifique os dados inseridos!",
  }));
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
