const { Schema, model } = require('mongoose')

 const esquemaUsuario = new Schema({
    nombres: String,
    usuario: String,
    password: String,
    correo: String,
  })

 const Usuario =  model('Usuario', esquemaUsuario)
 module.exports = Usuario