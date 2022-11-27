
var express = require('express');
var prospeccionController = require('../controllers/prospeccionController');
var auth = require('../middlewares/authenticate');

var app = express.Router();

//------------------- LLAMADAS ----------------------------
app.post('/crear_llamada_prospeccion_admin', auth.auth, prospeccionController.crear_llamada_prospeccion_admin);
app.get('/listar_llamadas_prospeccion_admin/:id', auth.auth, prospeccionController.listar_llamadas_prospeccion_admin);
//------------------- LLAMADAS ----------------------------

//------------------- COPRREOS ----------------------------
app.post('/crear_correo_prospeccion_admin', auth.auth, prospeccionController.crear_correo_prospeccion_admin);
app.get('/listar_correos_prospeccion_admin/:id', auth.auth, prospeccionController.listar_correos_prospeccion_admin);
//------------------- COPRREOS ----------------------------

//------------------- TAREAS ----------------------------
app.post('/crear_tarea_prospeccion_admin', auth.auth, prospeccionController.crear_tarea_prospeccion_admin);
app.get('/listar_tareas_prospeccion_admin/:id', auth.auth, prospeccionController.listar_tareas_prospeccion_admin);
//------------------- TAREAS ----------------------------

module.exports = app;



