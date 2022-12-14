const mongoose = require('mongoose');
const { Schema } = mongoose;

const cursosSchema = new Schema({
    email: String,
    paymethod: {type: String, enum: ['Tarjeta','Depósito','PayPal','Realizada']},
    nombre: String,
    costo: String
});


module.exports =  mongoose.model('cursos',cursosSchema);

