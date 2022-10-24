
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Fabioleo12';

// AUTENTICAR DATOS A GUARDAR EN LA DATABASE
exports.auth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'NoHeadersError'});
    }
    // console.log(req.headers);

    var token = req.headers.authorization.replace(/['"]+/g,'');
    // HEADER | ALGORITMO DE ENCRIPTACION
    // PAYLOAD | DATOS ENCRIPTADOS
    // FIRMA DEL TOKEN
    var segment = token.split('.');
    // console.log(segment);

    if (segment.length != 3 ) {
        return res.status(403).send({message: 'Invalid Token'});
    }else{
        try { 
            var payload = jwt.decode(token, secret); 
            // console.log(payload);
            // DETERMINAR SI EL TOKEN AUN NO EXPIRO
            if (payload.exp <= moment().unix()) {
                return res.status(403).send({message: 'Token Expired'});
            }
        }
        catch (error) { return res.status(403).send({message: 'error Token'}); }

    }

    req.user = payload;

    next();
}


