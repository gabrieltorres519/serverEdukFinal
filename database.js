const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost/proyectoFinalPrueba')
mongoose.connect('mongodb://db-microservicio-compra:SjBMDsgPsUur9gJT5lq6cvcxe9HDwIG6uCSQIkZK2GK7xrt7kX6PJ4H2qxRNCwlO8wL8Bmt4OtBXACDby4sV8g==@db-microservicio-compra.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@db-microservicio-compra@')
    .then(db => console.log('BASE DE DATOS CONECTADA', db.connection.host))
    .catch(err => console.error(err));  