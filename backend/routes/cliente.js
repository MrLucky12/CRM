
var express = require('express');
var clienteController = require('../controllers/clienteController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
app.get('/validar_correo_verificacion/:token', clienteController.validar_correo_verificacion);

module.exports = app;
