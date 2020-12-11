var express= require('express');
var router = express.Router();

// Obtener todas las categorias 
router.get('/', function (req, res){
    res.send('Obtener las categorias');
    res.end();
});

// Obtener las aplicaciones segun la categorias seleccionada
// http://localhost:8888/categorias/23/aplicaciones
router.get('/:idCategoria/aplicaciones', function (req, res){
    res.send(`Obtener las aplicaciones de la categoria: ${req.params.idCategoria}`);
    res.end();
})

// Obtener la informacion de la aplicacion seleccionada
// http://localhost:8888/categorias/233/aplicaciones/2/descripcion

router.get('/:idCategoria/aplicaciones/:idAplicacion/descripcion', function(req, res){
    res.send(`Obtener la descripcion de la aplicacion seleccionada ${req.params.idAplicacion}  de la categoria ${req.params.idCategoria}`);
    res.end();
})

// Agregar un comentario a una aplicacion seleccionada
// http://localhost:8888/categorias/12/aplicaciones/5/comentario

router.post('/:idCategoria/aplicaciones/:idAplicacion/comentario', function(req,res){
    res.send(`Guardar un comentario a la aplicacion ${req.params.idAplicacion} de la categoria ${req.params.idCategoria}` );
    res.end();
})


// Agregar una nueva aplicacion
//http://localhost:8888/categorias/id/aplicacion
router.post('/:idCategoria/aplicacion', function(req, res){
    res.send(`Guardar una nueva aplicacion a la categoria seleccionada ${req.params.idCategoria}`);
    res.end();
})
/* 1.Obtener una lista de las categorias de aplicacion
2. Obtener las aplicaciones segun la categoria seleccionada
3. Obtener la informacion de la aplicacion seleccionada
4. Agregar un comentario a una aplicacion seleccionada
5.Agregar una nueva aplicacion */

module.exports = router;