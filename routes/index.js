const passport = require('passport');
const { Router, json } = require('express');
const router = Router();
const cursos = require('../models/compracursos');
const cursosAdmin = require('../models/cursosList');
const pdfService = require('../service/pdf-service');
const comentarios = require('../models/comments');
const { serializeUser } = require('passport');
const path = require('path');
const { findById } = require('../models/compracursos');

router.get('/', (req,res,next)=>{
  res.send('Servicio de Compra de Cursos Funcionando')
});
 
//Administrador
router.get('/todosCursosAdmin', async (req, res, next) => {

  const cursosUsu = await cursosAdmin.find();
  

  res.json(cursosUsu);// era res.render('cursos');

  console.log('Mostrando cursos Admin')
});  
 
router.post('/insertarCursoPlataforma', async (req, res, next)=>{
  console.log('Entró a Ingresando curso Admin')
  console.log(req.body);
  

  let cursoAdmin = new cursosAdmin(); 
  cursoAdmin.nombre = req.body.nombre  
  cursoAdmin.costo = req.body.costo  
  cursoAdmin.inscripciones = req.body.inscripciones
  cursoAdmin.profesor = req.body.profesor 

  cursoAdmin.save((err, cursoStored)=>{
      if (err) res.status(500).send({message: 'Error al guardar'})
  }) 

  res.send('<h1>Curso Nuevo Registrado!!</h1><br><a href="https://clientemicroservicios-production.up.railway.app/cursos">Regresar</a>')
  console.log('Ingresando curso Admin')
  
    // res.redirect(301, 'file:///C:/Users/Inspiron%207568/Documents/Computo_nube/Cliente_UI/insertData.html');
     //res.json({mensaje: 'Realizado'})    
});  


router.get('/deletePlataforma/:id',async(req,res)=>{
  const {id} = req.params 
  await cursosAdmin.findByIdAndDelete(id,req.body)
  // console.log(req.body);
  // res.send('Cambio recibido');
  res.send('<h1>Curso eliminado!</h1><br><a href="https://clientemicroservicios-production.up.railway.app/cursos">Regresar</a>')
  console.log('Eliminando curso Admin')

});

//Usuario Estudiante

router.get('/todosCursos', async (req, res, next) => {

  const cursosUsu = await cursos.find();
  

  res.json(cursosUsu);// era res.render('cursos');

  console.log('Mostrando cursos')
});  
 
router.post('/insertarCurso', async (req, res, next)=>{
  console.log(req.body);

  console.log(req.body.paymethod)

  if(req.body.paymethod != 'Realizada'){
    const cursosUsu = await cursosAdmin.findOneAndUpdate({nombre: req.body.nombre},{$inc:{inscripciones:1}});
  }

  let curso = new cursos(); 
  curso.email = req.body.email
  curso.paymethod = req.body.paymethod
  curso.nombre = req.body.nombre  
  curso.costo = req.body.costo   

  curso.save((err, cursoStored)=>{
      if (err) res.status(500).send({message: 'Error al guardar'})
  }) 

  res.send('<h1>Curso comprado!!</h1><br><a href="https://clientemicroservicios-production.up.railway.app/profile">Ir a tus cursos</a>')
  console.log('Ingresando curso')
  
    // res.redirect(301, 'file:///C:/Users/Inspiron%207568/Documents/Computo_nube/Cliente_UI/insertData.html');
     //res.json({mensaje: 'Realizado'})    
});  

router.get('/invoice',async (req,res,sext)=>{
  const cursosUsu = await cursosAdmin.find();

  console.log(cursosUsu[0].nombre)

  console.log(cursosUsu.length)




  const stream = res.writeHead(200,{
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment;filename=invoice.pdf'
  })

  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    cursosUsu 
  )
})

router.get('/delete/:id',async(req,res)=>{
  const {id} = req.params 
  const cursoBorrado = await cursos.findById(id)

  if(cursoBorrado.paymethod != 'Realizada'){
    const cursosUsu = await cursosAdmin.findOneAndUpdate({nombre: cursoBorrado.nombre},{$inc:{inscripciones: -1}});
  }
  
  await cursos.findByIdAndDelete(id,req.body)

  // console.log(req.body);
  // res.send('Cambio recibido');
  res.send('<h1>Curso eliminado!</h1><br><a href="https://clientemicroservicios-production.up.railway.app/profile">Ir a tus cursos</a>')
  console.log('Eliminando curso')

});
 


//Renderizado de los cursos


router.get('/cpp', (req, res, next) => {
  res.render('cpp');
});

router.get('/javascript', (req, res, next) => {
  res.render('javascript');
});

router.get('/meanstack', (req, res, next) => {
  res.render('meanstack');
});

router.get('/python', (req, res, next) => {
  res.render('python');
});


//Comentarios

router.get('/todosComentarios', async (req, res, next) => {

  const comentariosUsu = await comentarios.find();
  

  res.json(comentariosUsu);// era res.render('cursos');

 
});  
 
router.post('/insertarComentario', async (req, res, next)=>{
  console.log('Endpoint golpeado')
  console.log(req.body);
  

  let comments = new comentarios(); 
  comments.email = req.body.email
  comments.comment = req.body.comment

  comments.save((err, cursoStored)=>{
      if (err) res.status(500).send({message: 'Error al guardar'})
  }) 

  console.log('Comentario Insertado') 
  //res.send('<h1>Curso comprado!</h1><br><a href="http://localhost:3000/profile">Ir a tus cursos</a>')
  
    // res.redirect(301, 'file:///C:/Users/Inspiron%207568/Documents/Computo_nube/Cliente_UI/insertData.html');
     //res.json({mensaje: 'Realizado'})    
});  


// router.get("/edit/:id",async(req,res)=>{
//   //console.log(req.params.id)
// const micurso = await cursos.findById(req.params.id).lean()

//  // res.render("edit");
//   res.send(micurso);
// });

// router.post("/edit/:id",async(req,res)=>{
//   const {id} = req.params
//   await cursos.findByIdAndUpdate(id,req.body)
//   console.log(req.body);
//   // res.send('Cambio recibido');
//   res.redirect('http://localhost:3000/profile')
// });

  

module.exports = router; 