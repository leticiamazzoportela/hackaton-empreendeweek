var express = require('express');
var router = express.Router();
const { Clientes, Enderecos, sequelize } = require('../models');


/* GET pagina clientes. */
router.get('/', function (req, res, next) {

  let clientesRetorno;

  Clientes.findAll({

  }).then(_clientes => {
    if (_clientes) {
      clientesRetorno = { sucesso: true, clientes: _clientes };
      //res.status(200).json({sucesso: true, clientes: _clientes})
    }
    else {
      clientesRetorno = { sucesso: false, msg: 'Não há clientes.' };
      //res.status(404).json({sucesso: false, msg: 'Não há clientes.'})
    }
    console.log(JSON.parse(clientesRetorno));
  }).catch(ex => {
    console.log(ex);
    res.status(500).send({ sucesso: false, msg: 'Erro interno.' })
  })


  res.render('procon_lista_processos', { Clientes: clientesRetorno });
});

/* POST clientes. */
router.post('/', (req, res, next) => {
  console.log(req.body.name);

  let cliente = {};
  let enderecoCliente = {};
  cliente.Nome = req.body.nome;
  cliente.CPF = req.body.cpf;
  cliente.RG = req.body.rg;
  cliente.Telefone = req.body.telefone;
  cliente.Email = req.body.email;
  enderecoCliente.rua = req.body.rua;
  enderecoCliente.bairro = req.body.bairro;
  enderecoCliente.numero = req.body.numeroCasa;
  enderecoCliente.quadraLote = req.body.quadraLote;
  enderecoCliente.complemento = req.body.complemento;
  enderecoCliente.Cidade = req.body.cidade;
  enderecoCliente.Estado = req.body.estado;

  let endCriado;

  Enderecos.find(cliente.cpf, {

  }).then(_cliente => {
    if (_cliente) {
      res.status(400).json({ sucesso: false, msg: 'Usuario duplicado.' })
    }
    else {
      Enderecos.create(enderecoCliente)
        .then((_endereco) => {
          if (_endereco) {
            console.log('Endereço criado.');
            console.log(_endereco);
            cliente.EnderecoIdEnderecos = _endereco.idEnderecos;
            Clientes.create(cliente)
              .then((_cliente) => {
                if (_cliente) {
                  res.status(200).json({ sucesso: true, Cliente: _cliente })
                }
                else {
                  res.status(400).json({ sucesso: false, msg: 'Cliente não adicionado.' })
                }
              })
          }
          else {
            console.log('Cliente não adicionado.')
            res.status(400).json({ sucesso: false, msg: 'Cliente não adicionado.' })
          }
        })
    }
  })

})

module.exports = router;