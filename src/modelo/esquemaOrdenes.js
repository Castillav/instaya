const {Schema, model} = require('mongoose')

const esquemaOrdenes = new Schema({
    dia: String,
    hora: String,
    ancho: Number,
    largo: Number,
    alto: Number,
    peso: Number,
    direccionRecogida: String,
    ciudadRecogida: String,
    cedula: Number,
    direccionDestinatario: String,
    ciudadDestinatario: String,
    estado: String,
    usuario: String

})

const Ordenes = model('Ordenes', esquemaOrdenes)
module.exports = Ordenes
