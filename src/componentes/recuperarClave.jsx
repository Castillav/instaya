import '../index.css'
import { Link, useNavigate } from "react-router-dom";
import React, {useState} from 'react';
import axios from 'axios';

const Recuperar = ()=> {

const navigate = useNavigate();

const [login, setLogin] = useState({usuario:'',correo:''})
const [mensaje,setMensaje] = useState({display:'none'});
const [mensajeE,setMensajeE] = useState({display:'none'});

const recolectandoDatos = (evento) =>{
 
  setLogin({
    ...login,[evento.target.name]:evento.target.value
  })
}
  
const enviarDatos = async (evento)=>{
  evento.preventDefault();
  console.log('NOMBRE: ' + login.usuario);
  console.log('CORREO: ' + login.correo);

  if(login.usuario === ''|| login.correo === ''){
   
     setMensaje({display:'inline'});
   
    }else{


  axios.post("https://instaya-lovat.vercel.app/api/recuperar", login)
  .then((data) => {
    console.log(data, "usuario encontrado");
    if (data.data.status== "ok") {
      console.log(" mi id:" + data.data.datos._id);
      navigate(`/cambiar/${data.data.datos._id}/${data.data.datos.usuario}`)
    }else{
      setMensajeE({display:'inline'});
    }  

  });

  }
}

const [estilo, setEstilo] = useState();
  const [Estado, setEstado] = useState();

  const Menu = ()=>{
  
    const cambiarEstilos = {transform: 'translate(100%)', transition:'ease-in .7s'}
    setEstilo(cambiarEstilos);
    setEstado('true');

    if(Estado == 'true'){
    const cambiarEstilos = {transform: 'translate(-100%)', transition:'ease-in .7s'}
    setEstilo(cambiarEstilos);
       setEstado('false');
    }
  }

  return (
    <div className="App">
   <header>
    <div className="menu"><img src="/static/img/menu.png" width="65px;" onClick={Menu}/></div>
    
    <nav id="barra_menu">
      <div className="titulo">instaYA</div>
      <div className="div_ul" style={estilo}>
        <ul className='ul'>
            <li className='li'><Link className={'routerLink'} to={'/'}>INICIO</Link></li>
            <li className='li'><Link className={'routerLink'} to={'/registrar_usuario'}>REGISTRESE</Link></li>
            <li className='li'><Link className={'routerLink'} to={'/nosotros'}>NOSOTROS</Link></li>
        </ul>
      </div>
     </nav>
 
</header>
      <div className='contenido'>
        <form className="row g-3" onSubmit={enviarDatos} >
         <label className="label_titulo">Recuperar Contaseña</label>
         <div className="mensaje" style={mensaje} >Debe llenar todos los campos</div>
         <div className="mensaje" style={mensajeE} >Datos incorrectos</div>
         <div className="form-group">
          <input type="text" className="form-control" name='usuario'  placeholder="Ingrese su usuario" value={login.usuario} onChange={recolectandoDatos} />
        </div><br/>
        <div className="form-group">
          <input type="text" className="form-control" name='correo'  placeholder="Ingrese su correo" value={login.correo} onChange={recolectandoDatos} />
        </div><br/>
        <div className="form-group" id="botones">
          <input type="submit" className="btn btn-primary" value={'Enviar'}/>
        </div><br/>
      </form>

      </div>
      <footer>
      <p className="contenido_piePagina">Contenido del sitio 2022© <br/>
        Derechos Reservados instaYA® <br/>
        Desarrollado por Min Tic Grupo 4 Ciclo 4<br/>
        Para pqr puedes contactarnos al correo <br/>
        solicitarpqr@instaya.com.co
      </p> 
    </footer>
     
    </div>
  )
}

export default Recuperar
