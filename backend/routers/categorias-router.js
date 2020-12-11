var express= require('express');
var router = express.Router();
var categoria = require('../models/categoria');
var mongoose = require('mongoose');

// Obtener todas las categorias 
router.get('/', function (req, res){
    categoria.find({},{_id:true, nombreCategoria:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
   
});

// Obtener las aplicaciones segun la categorias seleccionada
// http://localhost:8888/categorias/23/aplicaciones
router.get('/:idCategoria/aplicaciones', function (req, res){
    categoria.find({},{_id:true, aplicaciones:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
   
})

// Obtener la informacion de la aplicacion seleccionada
// http://localhost:8888/categorias/233/aplicaciones/2/descripcion

router.get('/:idCategoria/aplicaciones/:idAplicacion/descripcion', function(req, res){
    categoria.find(
        {
            _id:req.params.idCategoria,
            "aplicaciones._id": mongoose.Types.ObjectId(req.params.idAplicacion)
        },
        { 
            "aplicaciones._id.$":true,
            descripcion: true
        })
    .then(result=>{
        res.send(result[0]);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    })
})

// Agregar un comentario a una aplicacion seleccionada
// http://localhost:8888/categorias/12/aplicaciones/5/comentarios

router.post('/:idCategoria/aplicaciones/:idAplicacion/comentarios', function(req,res){
    categoria.update(
        {
            _id:mongoose.Types.ObjectId(req.params.idCategoria),
            "aplicaciones._id": mongoose.Types.ObjectId(req.params.idAplicacion)

        },
        {
            $push:{
                "aplicaciones.$.comentarios":{
                    comentario: req.body.comentario,
                    calificacion: req.body.calificacion,
                    fecha: req.body.fecha,
                    usuario: req.body.usuario

                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }) .catch(error=>{
        res.send(error);
        res.end();
    });
});
    


// Agregar una nueva aplicacion
//http://localhost:8888/categorias/id/aplicacion
router.post('/:idCategoria/aplicaciones', function(req, res){
    categoria.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idCategoria)
        },
        {
            $push:{
                "aplicaciones":{
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    icono: req.body.icono,
                    calificacion: req.body.calificacion,
                    descargas: req.body.descargas,
                    precio: req.body.precio,
                    desarrollador: req.body.desarrollador

                }
            }
        }
    ).then(result=>{
        res.send(result);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
});
/* 1.Obtener una lista de las categorias de aplicacion
2. Obtener las aplicaciones segun la categoria seleccionada
3. Obtener la informacion de la aplicacion seleccionada
4. Agregar un comentario a una aplicacion seleccionada
5.Agregar una nueva aplicacion */

module.exports = router;