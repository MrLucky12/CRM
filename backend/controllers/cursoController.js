
var Curso = require('../models/Curso');
var fs = require('fs');
var path = require('path');
const { title } = require('process');


const registro_curso_base_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        try {
            let course = await Curso.find({title: data.title});
            if (course.length >= 1) {
                res.status(200).send({data: undefined, message: 'Ya existe un curso con este nombre'});    
            }else {
                var relative_img_path = req.files.banner.path;
                var split_relative_img_path = relative_img_path.split('\\');
                var real_img_name = split_relative_img_path[2];
                data.banner = real_img_name;

                data.slug = data.title.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                let newCourse = await Curso.create(data);

                res.status(200).send({data: newCourse});
            }
        } 
        catch (error) { res.status(200).send({data: undefined, message: 'Ocurri un problema al registrar el curso'}); }
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const listar_cursos_admin = async function(req, res) {
    if (req.user) {
        let lista = await Curso.find().sort({title: -1});
        res.status(200).send({data: lista});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const get_imagen_curso = async function(req, res) {
    var img = req.params['img'];
    var dir = './uploads/course/';
    fs.stat(dir+img, function(err){
        if (!err) {
            let path_img = dir+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img = dir+'default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    });
}

const obtener_datos_curso_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];

        try {
            let curso = await Curso.findById({_id: id});        
            res.status(200).send({data: curso});   
        } 
        catch (error) { res.status(200).send({data: undefined});  } }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const editar_curso_base_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;

        try {
            let course = await Curso.find({title: data.title});

            if (course.length >= 1) {
                if (course[0]._id == id) {

                    if (req.files) {
                        var relative_img_path = req.files.banner.path;
                        var split_relative_img_path = relative_img_path.split('\\');
                        var real_img_name = split_relative_img_path[2];
                        data.banner = real_img_name;
                        data.slug = data.title.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    
                        let newCourse = await Curso.findByIdAndUpdate({_id: id}, {
                            title: data.title, 
                            slug: data.slug,
                            descriptio: data.description,
                            banner: data.banner
                        });
    
                        res.status(200).send({data: newCourse});
                    }
                    else{
                        let newCourse = await Curso.findByIdAndUpdate({_id: id}, {
                            title: data.title, 
                            slug: data.slug,
                            descriptio: data.description
                        }
                    );
                        
                        res.status(200).send({data: newCourse});
                    }

                } 
                else { res.status(200).send({data: undefined, message: 'Ya existe un curso con este nombre'}); }
            }
            else {

                if (req.files) {
                    var relative_img_path = req.files.banner.path;
                    var split_relative_img_path = relative_img_path.split('\\');
                    var real_img_name = split_relative_img_path[2];
                    data.banner = real_img_name;
                    data.slug = data.title.trim().toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

                    let newCourse = await Curso.findByIdAndUpdate({_id: id}, {
                        title: data.title, 
                        slug: data.slug,
                        descriptio: data.description,
                        banner: data.banner
                    });

                    res.status(200).send({data: newCourse});
                }
                else{
                    let newCourse = await Curso.findByIdAndUpdate({_id: id}, {
                        title: data.title, 
                        slug: data.slug,
                        descriptio: data.description
                    }
                );
                    
                    res.status(200).send({data: newCourse});
                }

            }
        } 
        catch (error) { res.status(200).send({data: undefined, message: 'Ocurrio un problema al registrar el curso'}); }
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const cambiar_estado_curso_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if (data.state) { nuevo_estado = false; }
        else if(!data.state) { nuevo_estado = true; }

        let curso = await Curso.findByIdAndUpdate({_id: id}, {state: nuevo_estado});

        res.status(200).send({data: curso});

    } else {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

module.exports = {
    registro_curso_base_admin,
    listar_cursos_admin,
    get_imagen_curso,
    obtener_datos_curso_admin,
    editar_curso_base_admin,
    cambiar_estado_curso_admin,
    
}