const moment = require("moment");

function isValidCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

function isValidDate(str) {
  var d = moment(str, "D/M/YYYY");
  if (d == null || !d.isValid()) return false;

  return (
    str.indexOf(d.format("D/M/YYYY")) >= 0 ||
    str.indexOf(d.format("DD/MM/YYYY")) >= 0 ||
    str.indexOf(d.format("D/M/YY")) >= 0 ||
    str.indexOf(d.format("DD/MM/YY")) >= 0
  );
}

const validarNumeros = (vetNum, empresaDDD) => {
  /*Deixando apenas números */
  vetNum = vetNum.map(value => {
    return value.replace(/[^0-9]/g, "");
  });
  let numerosComCodigoNacional = vetNum
    .filter(value => {
      return value.match(/^(55)[1-9]{2}(9?[1-9])[0-9]{3}[0-9]{4}$/g);
    })
    .map(value => {
      if (value.match(/^(55)[1-9]{2}([1-9])[0-9]{3}[0-9]{4}$/g)) {
        return value.substr(0, 4) + "9" + value.substr(4);
      }
      return value;
    });
  let numerosComDDD = vetNum
    .filter(value => {
      return value.match(/^[1-9]{2}(9?[1-9])[0-9]{3}[0-9]{4}$/g);
    })
    .map(value => {
      if (value.match(/^[1-9]{2}([1-9])[0-9]{3}[0-9]{4}$/g)) {
        return "55" + value.substr(0, 2) + "9" + value.substr(2);
      }
      return "55" + value;
    });
  let numerosSemDDD = vetNum
    .filter(value => {
      return value.match(/^(9?[1-9])[0-9]{3}[0-9]{4}$/g);
    })
    .map(value => {
      if (value.match(/^([1-9])[0-9]{3}[0-9]{4}$/g)) {
        return "55" + empresaDDD + "9" + value;
      }
      return "55" + empresaDDD + value;
    });
  return numerosComCodigoNacional.concat(numerosComDDD, numerosSemDDD);
};

module.exports = {
  isValidCNPJ,
  isValidDate,
  validarNumeros
};
