
var Curso = require('../models/Curso');
var Ciclo_curso = require('../models/Ciclo_curso');
var Ciclo_salon = require('../models/Ciclo_salon');
var Ciclo_docente = require('../models/Ciclo_docente');
var Nivel = require('../models/Curso_nivel');
var fs = require('fs');
var path = require('path');
const { title } = require('process');
const { start } = require('repl');

// COURSE
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
    if (req.user) 
    {
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
            let curso = await Curso.findById({_id: id}).populate('level'); 
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

const listar_cursos_modal_admin = async function(req, res) {
    if (req.user) 
    {
        let lista = await Curso.find({state: true}).sort({title: -1}).select('_id title');
        res.status(200).send({data: lista});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}
// COURSE

// LEVEL COURSE
const registro_nivel_curso_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        try {
            let lv = await Nivel.find({level: data.level});
            if (lv.length >= 1) {
                res.status(200).send({data: undefined, message: 'Ya existe un nivel con este nombre'}); 
            }else {
                let newLevel = await Nivel.create(data);

                res.status(200).send({data: newLevel});
            }
        } 
        catch (error) { res.status(200).send({data: undefined, message: 'Ocurrio un problema al registrar el nivel'}); }
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const listar_nivel_curso_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let lista = await Nivel.find({curso: id}).sort({level: -1});
        res.status(200).send({data: lista});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}
// LEVEL COURSE

// CICLE COURSE
const crear_ciclo_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        let months = [];
        data.colaborador = req.user.sub;

        let start_format = new Date(data.start_course+'T00:00:00');
        let end_format = new Date(data.end_course+'T23:59:59');

        let start_month = start_format.getMonth()+1;
        let end_month = end_format.getMonth()+1;

        // SALES STARTS THE SAME DAY OF CREATION LOG
        let start_sold = new Date().toISOString().slice(0, 10);
        data.start_sold = start_sold;
        // SALES STARTS 14D BEFORE START COURSE
        // start_sold = start_format;
        // start_sold.setDate(start_sold.getDate()+14);
        // console.log(start_sold);

        // OBTENER RANGO DE FECHAS DEL INICIO DEL CURSO
        if (start_month != end_month) {
            if (start_month >= end_month) {
                for (let i = start_month; i <= 12; i++) { months.push(i); }
                for (let i = 1; i <= end_month; i++) { months.push(i); }
            }
            else { for (let i = start_month; i <= end_month; i++) { months.push(i); } }
        } 
        else { months.push(start_month); }

        data.months = months;
        data.year = start_format.getFullYear();
        let cicle = await Ciclo_curso.create(data);

        // ROOM OR ROOMS?
        let rooms = data.room;
        for (var item of rooms) {
            await Ciclo_salon.create({
                days: item.days,
                course: data.course,
                ciclo_curso: cicle._id,
                room: item.room,
                total_capacity: item.total_capacity,
                start_time: item.start_time,
                end_time: item.end_time,
                colaborador: data.colaborador
            });
        }

        res.status(200).send({data: cicle});
    }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const listar_ciclos_admin = async function(req, res) {
    if (req.user) {
    
        let id = req.params['id'];
        let date = new Date();
        let year = date.getFullYear();
        let today_format = Date.parse(new Date())/1000;

        var cicles = await Ciclo_curso.find({course: id, year: year}).populate('course');
        var v = [];
    
        for(var item of cicles) 
        {
            let start_format = Date.parse(new Date(item.start_sold+'T00:00:00'))/1000;
            let end_format = Date.parse(new Date(item.end_course+'T00:00:00'))/1000;

            if (today_format >= start_format && today_format <= end_format) 
            {
                let rooms = await Ciclo_salon.find({ciclo_curso:item._id});
                v.push({cicle:item, room: rooms}); 
            }
        }

        res.status(200).send({data: v});
    }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const listar_ciclos_vencidos_admin = async function(req, res) {
    if (req.user) {
    
        let date = new Date();
        let year = date.getFullYear();
        let today_format = Date.parse(new Date())/1000;

        var cicles = await Ciclo_curso.find({year: year}).populate('course');
        var v = [];
    
        for(var item of cicles) 
        {
            let end_format = Date.parse(new Date(item.end_course+'T00:00:00'))/1000;

            if (today_format >= end_format) 
            {
                let rooms = await Ciclo_salon.find({ciclo_curso:item._id});
                v.push({cicle:item, room: rooms}); 
            }
        }

        res.status(200).send({data: v});
    }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const obtener_datos_curso_ciclo_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let idcicle = req.params['idciclo'];

        try {
            let course = await Curso.findById({_id: id}); 
            try {
                let cicle = await Ciclo_curso.findById({_id: idcicle});
                let rooms = await Ciclo_salon.find({ciclo_curso: idcicle});
                res.status(200).send({data: course, cicle: cicle, rooms: rooms}); 
            }
            catch (error) { res.status(200).send({data: undefined}); }
        } 
        catch (error) { res.status(200).send({data: undefined});  } }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const editar_ciclo_admin = async function(req, res) {
    if(req.user)
    {
        let id = req.params['id'];
        let data = req.body;
        
        let cicle = await Ciclo_curso.findByIdAndUpdate({_id: id},
            {
                level: data.level,
                location: data.location,
                start_course: data.start_course,
                end_course: data.end_course,
                description: data.description,
                price: data.price
            });
        res.status(200).send({data: cicle});
    }
    else{ res.status(403).send({data: undefined, message: 'No Token'}); }

}

const agregar_salon_ciclo_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        let room = await Ciclo_salon.create(data);
        res.status(200).send({data: room});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const obtener_salones_ciclo_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let rooms = await Ciclo_salon.find({ciclo_curso: id});
        res.status(200).send({data: rooms});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const eliminar_salon_ciclo_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        await Ciclo_salon.findByIdAndRemove({_id: id});
        res.status(200).send({data: true});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const cambiar_estado_ciclo_admin = async function(req, res) {
    if (req.user) 
    {
        let id = req.params['id'];
        let data = req.body;
        let nuevo_estado;

        if (data.state) { nuevo_estado = false; }
        else if(!data.state) { nuevo_estado = true; }

        let cicle = await Ciclo_curso.findByIdAndUpdate({_id: id}, {state: nuevo_estado});

        res.status(200).send({data: cicle});

    } 
    else 
    {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

const listar_docente_salon_admin = async function(req, res) {
    if (req.user) 
    {
        let id = req.params['id'];
        let list = await Ciclo_docente.find({ciclo_curso: id}).populate('colaborador').populate('ciclo_salon');
        res.status(200).send({data: list});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const agregar_docente_salon_admin = async function(req, res)
{
    if (req.user) 
    {
        let data = req.body;
        let teacher = await Ciclo_docente.create(data);
        res.status(200).send({data: teacher});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const eliminar_docente_salon_admin = async function(req, res) {
    if (req.user) 
    {
        let id = req.params['id'];
        await Ciclo_docente.findByIdAndRemove({_id: id});
        res.status(200).send({data: true});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}
// CICLE COURSE

module.exports = {
    registro_curso_base_admin,
    listar_cursos_admin,
    get_imagen_curso,
    obtener_datos_curso_admin,
    editar_curso_base_admin,
    cambiar_estado_curso_admin,
    registro_nivel_curso_admin,
    listar_nivel_curso_admin,
    crear_ciclo_admin,
    listar_ciclos_admin,
    listar_ciclos_vencidos_admin,
    obtener_datos_curso_ciclo_admin,
    editar_ciclo_admin,
    agregar_salon_ciclo_admin,
    obtener_salones_ciclo_admin,
    eliminar_salon_ciclo_admin,
    cambiar_estado_ciclo_admin,
    listar_docente_salon_admin,
    agregar_docente_salon_admin,
    eliminar_docente_salon_admin,
    listar_cursos_modal_admin,
}