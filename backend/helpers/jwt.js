
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Fabioleo12';

exports.createToken = function(user) {
    var payload = {
        sub: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
    }

    return jwt.encode(payload, secret);

}