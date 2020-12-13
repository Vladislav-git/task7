const usersService = require('../service/user.service.js');


class UsersController {
	service = usersService;

	me = async (req, res, next) => {
		res.send(await this.service.me(req.login));
	};

	login = async (req, res, next) => {
		res.send(await this.service.login(req.body.login, req.body.password));
	};


	get = async (req, res, next) => {
		res.send(await this.service.getUsers());
	};

	getById = async (req, res, next) => {
		res.send(await this.service.getUserById(req.params.id))
	};

	add = async (req, res, next) => {
		res.send(await this.service.addUser(req.body))
	};

	change = async (req, res, next) => {
		res.send(await this.service.changeUser(req.body, req.params.id))
	};
	
	delete = async (req, res, next) => {
		res.send(await this.service.deleteUser(req.params.id))
	}
}


module.exports = new UsersController();