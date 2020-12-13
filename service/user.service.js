const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const mydb = new Sequelize('postgres://postgres:1234@127.0.0.1:5432/mydb');
const usersmodel = mydb.define('users', {
	login: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});
usersmodel.sequelize.sync();


class UsersService {

	me = async (login) => {
		return usersmodel.findOne({where: {login : login}})
			.then(data => data)
			.catch(err => 'no such ')
	};


	login = async (login, pass) => {
		return usersmodel.findOne({where: {login : login}})
			.then(data => {
				console.log(data);
				if (bcrypt.compareSync(pass, data.password) === true) {
					const token = jwt.sign({ login }, 'somesecretkey');
					return token;
				} else {
					return 'wrong password';
				};
			})
			.catch(err => 'wrong login')

	};

	getUsers = async () => {
		return usersmodel.findAll()
			.then(data => data)
			.catch(err => 'Try again')
	};

	getUserById = async (id) => {
		usersmodel.findByPk(id)
			.then(data => data)
			.catch(err => 'User not found')
	};

	addUser = async (body) => {
		const cryptedpass = bcrypt.hashSync(body.password, 10);
		usersmodel.findOrCreate({where:{login:body.login, password:cryptedpass}})
			.then(() => 'user created')
			.catch(err => err.message)
	};

	changeUser = async (body, id) => {
		usersmodel.findByPk(id)
			.then(data => {
				data.password = body.password;
				return data;
			})
			.catch(err => err.message)
	};

	deleteUser = async (id) => {
		usersmodel.destroy({where:{id:`${id}`}})
			.then(data => 'user deleted')
			.catch(err => err.message)
	};
};


module.exports = new UsersService();