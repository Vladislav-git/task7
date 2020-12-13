const controller = require('../controller/users.controller.js');

const express = require('express');
const auth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router
	.get('/me', auth, controller.me)
	.get('/users/:id', auth, controller.getById)
	.get('/users', auth, controller.get)
	.post('/login', controller.login)
	.post('/users', controller.add)
	.put('/users/:id', auth, controller.change)
	.delete('/users/:id', auth, controller.delete)

module.exports = router;