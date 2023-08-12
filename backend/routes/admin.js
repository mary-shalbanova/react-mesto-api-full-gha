const adminRoutes = require('express').Router();
const { login, logout, createUser } = require('../controllers/users');
const { createUserValidation, authValidation } = require('../middlewares/userValidation');

adminRoutes.post('/signin', authValidation, login);
adminRoutes.post('/signup', createUserValidation, createUser);
adminRoutes.get('/logout', logout);

module.exports = adminRoutes;
