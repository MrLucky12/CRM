
var express = require('express');
var cursoController = require('../controllers/cursoController');
var auth = require('../middlewares/authenticate');
var multiparty = require('connect-multiparty');
var path = multiparty({uploadDir: './uploads/course'});

var app = express.Router();

// COURSE
app.post('/registro_curso_base_admin', [auth.auth, path], cursoController.registro_curso_base_admin);

app.get('/listar_cursos_admin', auth.auth, cursoController.listar_cursos_admin);
app.get('/get_imagen_curso/:img', cursoController.get_imagen_curso);
app.get('/obtener_datos_curso_admin/:id', auth.auth, cursoController.obtener_datos_curso_admin);
app.get('/listar_cursos_modal_admin', auth.auth, cursoController.listar_cursos_modal_admin);

app.put('/editar_curso_base_admin/:id', [auth.auth, path], cursoController.editar_curso_base_admin);
app.put('/cambiar_estado_curso_admin/:id', auth.auth, cursoController.cambiar_estado_curso_admin);
// COURSE

// COURSE LEVEL
app.post('/registro_nivel_curso_admin', auth.auth, cursoController.registro_nivel_curso_admin);

app.get('/listar_nivel_curso_admin/:id', auth.auth, cursoController.listar_nivel_curso_admin);

// COURSE LEVEL

// COURSE CICLE
app.post('/crear_ciclo_admin', auth.auth, cursoController.crear_ciclo_admin);
app.post('/agregar_salon_ciclo_admin', auth.auth, cursoController.agregar_salon_ciclo_admin);
app.post('/agregar_docente_salon_admin', auth.auth, cursoController.agregar_docente_salon_admin);

app.get('/listar_ciclos_admin/:id', auth.auth, cursoController.listar_ciclos_admin);
app.get('/listar_ciclos_vencidos_admin', auth.auth, cursoController.listar_ciclos_vencidos_admin);
app.get('/obtener_datos_curso_ciclo_admin/:id/:idciclo', auth.auth, cursoController.obtener_datos_curso_ciclo_admin);
app.get('/obtener_salones_ciclo_admin/:id', auth.auth, cursoController.obtener_salones_ciclo_admin);
app.get('/listar_docente_salon_admin/:id', auth.auth, cursoController.listar_docente_salon_admin);

app.delete('/eliminar_salon_ciclo_admin/:id', auth.auth, cursoController.eliminar_salon_ciclo_admin);
app.delete('/eliminar_docente_salon_admin/:id', auth.auth, cursoController.eliminar_docente_salon_admin);

app.put('/editar_ciclo_admin/:id', auth.auth, cursoController.editar_ciclo_admin);
app.put('/cambiar_estado_ciclo_admin/:id', auth.auth, cursoController.cambiar_estado_ciclo_admin);
// COURSE CICLE



module.exports = app;



