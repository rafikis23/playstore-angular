
var mongoose = require('mongoose');
var esquema = new mongoose.Schema(
    {
        nombreCategoria: String,
        descripcion: String,
        aplicaciones: mongoose.SchemaTypes.Mixed
    }
);

module.exports = mongoose.model('categorias', esquema);