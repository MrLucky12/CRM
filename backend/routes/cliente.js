
var express = require('express');
var clienteController = require('../controllers/clienteController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

app.post('/registro_cliente_admin', auth.auth, clienteController.registro_cliente_admin);
app.get('/validar_correo_verificacion/:token', clienteController.validar_correo_verificacion);
app.get('/listar_clientes_admin/:filtro', auth.auth, clienteController.listar_clientes_admin);

module.exports = app;
