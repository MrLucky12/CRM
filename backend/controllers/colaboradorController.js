
var Colaborador = require('../models/Colaborador');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_colaborador_admin = async function(req, res) 
{
    if ( req.user ) 
    {
        let data = req.body;
        try 
        {
            var colaboradores = await Colaborador.find({email: data.email});
            bcrypt.hash('123456789', null, null, async function(err, hash)
            {
                if (err) { res.status(200).send({data: undefined, message: 'No se pudo generar la password'}); }
                else
                {
                    if (colaboradores.length >= 1) { res.status(200).send({data: undefined, message: 'El correo ya existe'}); } 
                    else 
                    {
                        data.fullname = data.name +' '+ data.lastName;
                        data.password = hash;
                        let colaborador = await Colaborador.create(data);
                        res.status(200).send({data: colaborador});    
                    }
                }
            });

        } catch (error) { res.status(200).send({data: undefined, message: 'Verifica los campos del formulario'}); } 

    } else{ res.status(403).send({data: undefined, message: 'No Token'}); }
}

const login_admin = async function(req, res) 
{
    let data = req.body; 
    // console.log(data);
    var colaboradores = await Colaborador.find({email: data.email});

    if (colaboradores.length >= 1) 
    {
        // SI HAY CUENTA
        if (colaboradores[0].state) 
        {
            bcrypt.compare(data.password, colaboradores[0].password, async function(err, check){
            
            if (check) { res.status(200).send({ data: colaboradores[0], token: jwt.createToken(colaboradores[0]) }) }
            else{ res.status(200).send({data: undefined, message: 'La clave es incorrecta'}); } });
        }
        else{ res.status(200).send({data: undefined, message: 'Contactate con tu supervisor '}); }

    }
    else{ res.status(200).send({data: undefined, message: 'El correo electronico no existe'}); }
}

const listar_colaboradores_admin = async function(req, res) {
    if (req.user) {
        let colaboradores = await Colaborador.find();
        res.status(200).send({data: colaboradores});
    } else {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

const cambiar_estado_colaborador_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;

        let nuevo_estado;

        if (data.state) { nuevo_estado = false; }
        else if(!data.state) { nuevo_estado = true; }

        let colaborador = await Colaborador.findByIdAndUpdate({_id: id}, {state: nuevo_estado});

        res.status(200).send({ata: colaborador});

    } else {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

const obtener_datos_colaborador_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];

        try {
            let colaborador = await Colaborador.findById({_id: id});        
            res.status(200).send({data: colaborador});   
        } 
        catch (error) { res.status(200).send({data: undefined});  }

    } else {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

const editar_colaborador_admin = async function(req, res) {
    if ( req.user ) 
    {
        let id = req.params['id'];
        let data = req.body;
        // console.log(data);
        let colaborador = await Colaborador.findByIdAndUpdate({_id: id},
            {
                name: data.name,
                lastName: data.lastName,
                fullname: data.name +''+ data.lastName,
                gender: data.gender,
                email: data.email,
                phone: data.phone,
                n_doc: data.n_doc,
                country: data.country,
                role: data.role
            });
            res.status(200).send({data: colaborador});

    }
    else{ res.status(403).send({data: undefined, message: 'No Token'}); }

}

const listar_asesores_admin = async function(req, res)
{
    if (req.user) 
    {
        let asesores = await Colaborador.find({role: 'Asesor', state: true}).select('_id fullname name lastName');
        res.status(200).send({data: asesores});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const listar_docentes_admin = async function(req, res)
{
    if (req.user) 
    {
        let asesores = await Colaborador.find({role: 'Docente', state: true}).select('_id fullname name lastName email');
        res.status(200).send({data: asesores});
    } 
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

module.exports = {
    registro_colaborador_admin,
    login_admin,
    listar_colaboradores_admin,
    cambiar_estado_colaborador_admin,
    obtener_datos_colaborador_admin,
    editar_colaborador_admin,
    listar_asesores_admin,
    listar_docentes_admin,
}