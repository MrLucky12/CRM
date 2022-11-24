
var Cliente = require('../models/Cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt_cliente = require('../helpers/jwt-cliente');
var jwt = require('jwt-simple');

// MAIL SENDER | CONFIRMATION
var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
const Colaborador = require('../models/Colaborador');

const registro_cliente_admin = async function(req, res) {
    // console.log(req.user);
    if ( req.user ) {
        let data = req.body;
        // console.log(data);
        try {
            var clientes = await Cliente.find({email: data.email});

            bcrypt.hash('123456789', null, null, async function(err, hash)
            {
                if (err) {
                    res.status(200).send({data: undefined, message: 'No se pudo generar la password'});        
                }else{
                    if (clientes.length >= 1) { res.status(200).send({data: undefined, message: 'El correo ya existe'}); } 
                    else 
                    {
                        data.fullname = data.name +' '+ data.lastName;
                        data.password = hash;
                        let cliente = await Cliente.create(data);
                        enviar_correo_verificacion(cliente.email);
                        res.status(200).send({data: cliente});    
                    }
                }
            });

        } catch (error) { 
            console.log(error);
            res.status(200).send({data: undefined, message: 'Verifica los campos del formulario'}); 
        } 

    } 
    else{ res.status(403).send({data: undefined, message: 'No Token'}); }
}

const enviar_correo_verificacion = async function(email) {

    // PREPARANDO ARCHIVO | PLANTILLA 
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else { callback(null, html); }
        });
    };
    
    // CONFIGURACION SMPT - PROTOCOLO | SERVIDOR GMAIL
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: '2000512fabio@gmail.com',
            pass: 'mdrtegdhyupwurie'
        }
    }));
    
    //OBTENER CLIENTE | ENVIO DE CORRE ELECTRONICO
    var cliente = await Cliente.findOne({email: email});
    var token = jwt_cliente.createToken(cliente);

    readHTMLFile(process.cwd() + '/mails/account_verify.html', (err, html)=>{
        // RENDERIZANDO VARIABLES PARA ENVIARLAS A LAS PLANTILLAS
        let rest_html = ejs.render(html, {token: token});
        // COMPILANDO LOS DATOS A ENVIAR
        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});
        // CONFIGURACION DEL MENSAJE
        var mailOptions = {
            from: '2000512fabio@gmail.com',
            to: email,
            subject: 'Verificación de cuenta',
            html: htmlToSend
        };
      
        transporter.sendMail(mailOptions, function(error, info){ if (!error) { console.log('Email sent: ' + info.response); } });
    
    });
}

const validar_correo_verificacion = async function(req, res) {
    var token_params = req.params['token'];
    var token = token_params.replace(/['"]+/g,'');
    var segment = token.split('.');

    if (segment.length != 3 ) { return res.status(403).send({message: 'Invalid Token'}); }
    else{
        try { 
            var payload = jwt.decode(token, 'Fabioleo12'); 
            // HASTA ESTE PUNTO LA VALIDACION DEL TOKEN HA SIDO CORRECTO
            await Cliente.findByIdAndUpdate({_id: payload.sub}, {verify: true});
            res.status(200).send({data: true});
        }
        catch (error) { 
            console.log(error);
            return res.status(200).send({message: 'El correo de verificacion expiro !', data: undefined});

         }
    }

}

const listar_clientes_admin = async function(req, res) {
    if (req.user) {
        let filtro = req.params['filtro'];
        let clientes = await Cliente.find({
            $or: [
                {name: new RegExp(filtro, 'i')},
                {lastName: new RegExp(filtro, 'i')},
                {n_doc: new RegExp(filtro, 'i')},
                {email: new RegExp(filtro, 'i')},
                {fullname: new RegExp(filtro, 'i')},
                {phone: new RegExp(filtro, 'i')}
            ]
        });
        res.status(200).send({data: clientes});
    } else {
        res.status(403).send({data: undefined, message: 'NoToken'});
    }
}

const obtener_datos_cliente_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];

        try {
            let cliente = await Cliente.findById({_id: id}).populate('asesor');        
            res.status(200).send({data: cliente});   
        } 
        catch (error) { res.status(200).send({data: undefined});  } }
    else { res.status(403).send({data: undefined, message: 'NoToken'}); }
}

const editar_cliente_admin = async function(req, res) {
    // console.log(req.user);

    if ( req.user ) {
        let id = req.params['id'];
        let data = req.body;
        // console.log(data);
        let cliente = await Cliente.findByIdAndUpdate({_id: id},
            {
                name: data.name,
                lastName: data.lastName,
                fullname: data.name +''+ data.lastName,
                gender: data.gender,
                email: data.email,
                phone: data.phone,
                n_doc: data.n_doc,
                country: data.country,
                city: data.city,
                birth: data.birth
            });
            res.status(200).send({data: cliente});

    }
    else{ res.status(403).send({data: undefined, message: 'No Token'}); }

}


module.exports = {
    registro_cliente_admin,
    validar_correo_verificacion,
    listar_clientes_admin,
    obtener_datos_cliente_admin,
    editar_cliente_admin
}