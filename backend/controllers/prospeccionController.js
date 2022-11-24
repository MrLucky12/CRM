
var Cliente_llamada = require('../models/Cliente_llamada');
var Cliente_correo = require('../models/Cliente_correo');
var Cliente = require('../models/Cliente');

// LLAMADAS
const crear_llamada_prospeccion_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        let llamada = await Cliente_llamada.create(data);
        res.status(200).send({data: llamada});
    }else{
        res.status(401).send({data: undefined, message: 'NoToken'});
    }
}

const listar_llamadas_prospeccion_admin = async function(req, res) {
    if (req.user) {
        let id = req.params['id'];
        let lista = await Cliente_llamada.find({cliente:id}).populate('asesor').sort({createdAt:-1});
        res.status(200).send({data: lista});
    }else{
        res.status(401).send({data: undefined, message: 'NoToken'});
    }
}
// LLAMADAS

// CORREOS
const crear_correo_prospeccion_admin = async function(req, res) {
    if (req.user) {
        let data = req.body;
        let cliente = await Cliente.findById({_id: data.cliente});
        enviar_correo_prospeccion(cliente.fullname, data.subject, cliente.email, data.body);
        let correo = await Cliente_correo.create(data);
        res.status(200).send({data: correo});
    }else{
        res.status(401).send({data: undefined, message: 'NoToken'});
    }
}
// CORREOS

// EXTRA
const enviar_correo_prospeccion = async function(cliente, asunto, email, contenido) {

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
    
    readHTMLFile(process.cwd() + '/mails/mail_message.html', (err, html)=>{
        // RENDERIZANDO VARIABLES PARA ENVIARLAS A LAS PLANTILLAS
        let rest_html = ejs.render(html, 
            {
                cliente: cliente,
                asunto: asunto,
                email: email,
                contenido: contenido,
            });
        // COMPILANDO LOS DATOS A ENVIAR
        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});
        // CONFIGURACION DEL MENSAJE
        var mailOptions = {
            from: '2000512fabio@gmail.com',
            to: email,
            subject: asunto,
            html: htmlToSend
        };
      
        transporter.sendMail(mailOptions, function(error, info){ if (!error) { console.log('Email sent: ' + info.response); } });
    
    });
}
// EXTRA


module.exports = {
    crear_llamada_prospeccion_admin,
    listar_llamadas_prospeccion_admin,
    crear_correo_prospeccion_admin,
    
}