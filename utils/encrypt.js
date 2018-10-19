const twinbcrypt = require('twin-bcrypt');

function nivelCriptografia(num){
	return twinbcrypt.genSalt(num); // definindo um nivel para o hash;
}

function encriptar(itemASerEncriptado, salt){
	return twinbcrypt.hashSync(itemASerEncriptado, salt); //fazendo hash da senha;
}

function comparar(dadoEntrada, dadoASerComparado){
	return twinbcrypt.compareSync(dadoEntrada, dadoASerComparado);
}

module.exports = {
	nivelCriptografia,
	encriptar,
	comparar,
};