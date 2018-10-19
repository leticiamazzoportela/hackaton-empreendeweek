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

  Enderecos.find(cliente.CPF, {

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
  }).catch(ex => {
    console.log(ex);
    res.status(500).send({ sucesso: false, msg: 'Erro interno.' })
  })



})


router.put('/', (req, res, next) => {

  let clienteAlterado = {};
  let enderecoClienteAlterado = {};

  clienteAlterado.Nome = req.body.nome;
  clienteAlterado.CPF = req.body.cpf;
  clienteAlterado.RG = req.body.rg;
  clienteAlterado.Telefone = req.body.telefone;
  clienteAlterado.Email = req.body.email;
  enderecoClienteAlterado.rua = req.body.rua;
  enderecoClienteAlterado.bairro = req.body.bairro;
  enderecoClienteAlterado.numero = req.body.numeroCasa;
  enderecoClienteAlterado.quadraLote = req.body.quadraLote;
  enderecoClienteAlterado.complemento = req.body.complemento;
  enderecoClienteAlterado.Cidade = req.body.cidade;
  enderecoClienteAlterado.Estado = req.body.estado;

  // Clientes.findOne({
  //   where: {
  //     CPF: clienteAlterado.CPF,
  //   }
  // }).then(_cliente => {

  // })

  res.status(501).json({sucesso: false, msg: 'Não implementado.'})
  

});


router.delete('/', (req, res, next) => {
  res.status(501).json({sucesso: false, msg: 'Não implementado.'})
});

module.exports = router;