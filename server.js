const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('./src/modelo/conexionBD');
const rutas = require('./src/controlador/controlador')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:'true'}))
app.use('/api/',rutas);

app.get('/', (req,res)=>{
    res.end('Mi nombre es Alfredo')
})

app.set('port',5000)
app.listen(app.get('port'), function() {
    console.log("Server is running on Port: " + app.set('port'));
});