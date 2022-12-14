const mongoose = require('mongoose');
const { Schema } = mongoose;

const cursosListSchema = new Schema({
    nombre: String,
    costo: String, 
    inscripciones: Number,
    profesor: String
});


module.exports =  mongoose.model('cursosList', cursosListSchema);