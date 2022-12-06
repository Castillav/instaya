const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://usuario_datos:BDM0ng0DB@cluster0.ahyc32i.mongodb.net/instaYA?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('Base de Datos Conectada')
}).catch(err =>{
    console.log(err)
})

//'mongodb+srv://usuario_datos:BDM0ng0DB@cluster0.ahyc32i.mongodb.net/instaYA?retryWrites=true&w=majority'
//calderonla@uninorte.com
//BDM0ng0DB


//mongodb+srv://usuario_datos:1048294992aug@cluster0.zpi7d.mongodb.net/instaYA?retryWrites=true&w=majority