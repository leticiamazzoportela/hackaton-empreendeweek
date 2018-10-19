var express = require('express');
var router = express.Router();
var models = require('./../models/index');

var Empresa = models.Empresas;
var validation = (dados) => {
  // valida os dados
  dados = dados;
  return true;
  // Exemplo bobo
}

router.post('/', (req, res, next) => {
  const { nomeFantasia, CNAE, cnpj, razaoSocial, telefoneFixo, telefoneCelular, email, fax, tipoEmpresa, faturamento } = req.body;
  if(!validation(cnpj)){
    /*
    res.render('pagina', {
      sucesso: false,
      mensagem: "dados invalidos!"
    });*/
    next(createError(400, {
      message: "dados Invalidos!"
    }));
    console.log("tem dados errados!");
  }

  Empresa.create({
    nomeFantasia,
    CNAE,
    cnpj,
    telefoneFixo,
    razaoSocial,
    email,
    telefoneCelular,
    fax,
    tipoEmpresa,
    faturamento
  }).then(() => {
    /*
    res.render('cad_empresa', { 
      sucesso: true,
      mensagem: "cadastrado com sucesso!"
    });
      */
    res.status(200).send("ola");
  }).catch(() => {
    next(createError(400));
  });
});
module.exports = router;