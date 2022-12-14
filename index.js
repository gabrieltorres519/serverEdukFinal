
const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const cors = require("cors"); // Resolviendo problema de cors

  

// initializations
const app = express();
require('./database');


// settings
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(cors());
//Permitir que el cliente envie json y express lo reciba
app.use(express.json())


// routes
app.use('/', require('./routes/index'));
 
// Starting the server
app.listen(app.get('port'), () => {
  console.log('server Purchases on port', app.get('port'));
});

