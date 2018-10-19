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
	},
	RG: {
		type: Sequelize.STRING(20),
		allowNull: false,
	},
	Cidade: {
		type: Sequelize.STRING(50),
		allowNull: false,
	},
	Estado: {
		type: Sequelize.STRING(2),
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
	},
	telefoneFixo: {
		type: Sequelize.STRING(20),
		allowNull: true,
	},
	endereco: {
		type: Sequelize.STRING(90),
		allowNull: false,
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
});

const Processos = sequelize.define('Processos', {
	idProcessos: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	reclamante: {
		type: Sequelize.STRING(128),
		allowNull: false,
	},
	historiaOcorrencia: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	status: {
		type: Sequelize.STRING(20),
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

//AS RELAÇÕES DENTRE AS TABELAS SEGUEM ABAIXO




// ControleCreditos.belongsTo(Empresas, {
// 	foreignKey: {
// 		allowNull: false,
// 		name: 'idEmpresas',
// 	}
// });


// Empresas.hasMany(Usuarios, {
// 	foreignKey: {
// 		allowNull: true,
// 		name: 'idEmpresa',
// 	}
// });

// Empresas.hasMany(Clientes, {
// 	foreignKey: {
// 		allowNull: false,
// 		name: 'idEmpresa',
// 	}
// });

// Empresas.hasMany(Perguntas, {
// 	foreignKey: {
// 		allowNull: false,
// 		name: 'idEmpresa',
// 	}
// });

// Pesquisas.hasMany(Perguntas, {
// 	foreignKey: {
// 		allowNull: true,
// 		name: 'idPesquisa',
// 	}
// });

// Perguntas.hasMany(Envios, {
// 	foreignKey: {
// 		name: 'idPerguntas',
// 		allowNull: false,
// 	}
// });

// Respostas.belongsTo(Perguntas, {
// 	foreignKey: {
// 		allowNull: false,
// 		name: 'idPerguntas',
// 	}
// });

// Respostas.belongsTo(Acoes, {
// 	foreignKey: {
// 		name: 'idAcao',
// 		allowNull: true,
// 	},
// });

// Envios.hasMany(Recibos, {
// 	foreignKey: {
// 		name: 'idPareado',
// 		allowNull: false,
// 	}
// });

//FIM DAS RELAÇÕES DAS TABELAS **********


// exporta o objeto criado para poder utilizar em outros lugares
module.exports = {
	sequelize,
	Clientes,
	Empresas,
	Processos,
};