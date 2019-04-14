var mongoose = require('mongoose');
const _ = require ('lodash')
var Todo = mongoose.model('Todo', {

    /*hedhi l structure mta3 l entité mte3na */
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },

    completed: {
        type: Boolean,
    
    },
    completedAt: {
        type: Date,
        

    },
    savedAt:{
        type: Date,
        
    },
    _creator:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }/* ma fhemtheech hedhiiii creator */
});

module.exports = { Todo }