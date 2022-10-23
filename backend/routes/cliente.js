var express = require('express')
var clienteController = require('../controllers/clienteController')
var auth = require('../middlewares/authenticate');

var app = express.Router();



module.exports = app;
