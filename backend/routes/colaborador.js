
var express = require('express')
var colaboradorController = require('../controllers/colaboradorController')
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/registro_colaborador_admin', auth.auth, colaboradorController.registro_colaborador_admin);
app.post('/login_admin', colaboradorController.login_admin);

module.exports = app;



