const jwt = require('jsonwebtoken');
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


const auth = (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')['1'];
        const result = jwt.verify(token, 'somesecretkey');
        //
        usersmodel.findOne({where:{login:result.login}})
            .then(data => {
                if (data === null) {
                    res.send('this user is not registered');
                } else {
                    req.login = result.login;
                    next();
                };
            });
    } catch (err) {
        res.send(err.message);
    };
};

module.exports = auth;