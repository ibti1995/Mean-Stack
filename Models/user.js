const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcryptjs');

/* el schema feha des methodes wel model mafihouch des methodes fih seulement des attributs 

houni 5demna bel scema w fel todo 5demna model 
el const securise akter mel var */


var UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email'
        }
    },
    tel: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    password: {

        type: String,
        required: true,
        minlength: 6,

    },
    tokens: [{    /* bech ynadhem les users  */
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});



//override
UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'firstname', 'lastname', 'email']);
};


UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });

        });
    } else {
        next();
    }

});
var User = mongoose.model('user', UserSchema);

module.exports = { User }
/*shift + alt +f pour aligner le code  */