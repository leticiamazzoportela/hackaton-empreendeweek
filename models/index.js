const Sequelize = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize('mysql://' + database.user + ':' + database.password + '@localhost:3306/' + database.databaseName, {
	define: {
		timestamps: false,
		freezeTableName: true,
	},
});

sequelize.authenticate()
	.then(() => {
		console.log('Conectado no BD com sucesso.');
	}).catch(ex => {
		console.error('Erro ao se conectar no BD:', ex);
	});

const Clientes = sequelize.define('Clientes', {
	idClientes: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	Nome: {
		type: Sequelize.STRING(128),
		allowNull: false,
	},
	CPF: {
		type: Sequelize.STRING(18),
		allowNull: false,
		unique: true,
	},
	RG: {
		type: Sequelize.STRING(20),
		allowNull: false,
	},
	Telefone: {
		type: Sequelize.STRING(9),
		allowNull: false,
	},
	Email: {
		type: Sequelize.STRING(64),
		allowNull: false,
	},
	Senha: {
		type: Sequelize.TEXT,
		allowNull: false,
	}
})

const Empresas = sequelize.define('Empresas', {
	idEmpresas: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nomeFantasia: {
		type: Sequelize.STRING(45),
		allowNull: true,
	},
	CNAE: {
		type: Sequelize.STRING(10),
		allowNull: false,
	},
	cnpj: {
		type: Sequelize.STRING(18),
		allowNull: false,
		unique: true,
	},
	telefoneFixo: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	razaoSocial: {
		type: Sequelize.STRING(45),
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING(90),
		allowNull: false,
	},
	telefoneCelular: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	fax: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	tipoEmpresa: {
		type: Sequelize.STRING(10),
		allowNull: false,
	},
	faturamento: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	classifaicacao: {
		type: Sequelize.INTEGER,
		allowNull: true,
	}
});

const Processos = sequelize.define('Processos', {
	idProcessos: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	historiaOcorrencia: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	docApresentados: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	dataHora: {
		type: Sequelize.DATE,
		allowNull:false,
	},
	formaAtendimento: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	tipoAtendimento: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	processo: {
		type: Sequelize.STRING(20),
		allowNull: false,
	},
});

const Enderecos = sequelize.define('Enderecos', {
	idEnderecos: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	rua: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	bairro: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	numero: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	quadraLote: {
		type: Sequelize.INTEGER(10),
		allowNull: true,
	},
	complemento: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
	Cidade: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	Estado: {
		type: Sequelize.STRING(2),
		allowNull: false,
	},
});

const Arquivamento = sequelize.define('Arquivamento', {
	idArquivamento : {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	arquivamento: {
		type: Sequelize.TEXT,
		allowNull: true,
	},
});

const Enquadramento = sequelize.define('Enquadramento', {
	idEnquadramento: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	area: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	assunto: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	problema: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

const Reclamadas = sequelize.define('Reclamadas', {
	idReclamadas: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
});

//AS RELAÇÕES DENTRE AS TABELAS SEGUEM ABAIXO

Enderecos.hasOne(Clientes);

Enderecos.hasOne(Empresas);

Enquadramento.hasOne(Processos);

Arquivamento.hasOne(Processos);

Clientes.hasOne(Processos);

Processos.hasMany(Reclamadas, {
	foreignKey: {
		allowNull: false,
		name: 'idProcessos',
	},
});

Empresas.hasMany(Reclamadas, {
	foreignKey: {
		allowNull: false,
		name: 'idEmpresas',
	},
});

//FIM DAS RELAÇÕES DAS TABELAS **********


// exporta o objeto criado para poder utilizar em outros lugares
module.exports = {
	sequelize,
	Clientes,
	Empresas,
	Processos,
	Enderecos,
	Reclamadas,
	Enquadramento,
	Arquivamento,
};