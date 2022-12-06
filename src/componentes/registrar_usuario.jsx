import '../index.css'
import { Link } from "react-router-dom";
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const registrarUsuario = () =>{

  const [usuario, setUsuario] = useState({nombres:'',usuario:'',password:'',correo:''})

const recolectandoDatos = (evento) =>{
 
  setUsuario({
    ...usuario,[evento.target.name]:evento.target.value
  })
}
  
const enviarDatos = async (evento)=>{
  evento.preventDefault();

    
  axios.post("http://localhost:5000/api/agregar", usuario)
  .then((response) => {
    setUsuario(response.data);
  });

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

  return(
    <div>
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
 
<div className="contenido"> 

<form  className="row g-3" onSubmit={enviarDatos}>
   <label className="label_titulo">Registrar Usuario</label>
    <div className="form-group">
      <input type="text" className="form-control" id="inputNombres" required placeholder="Nombres" name='nombres' onChange={recolectandoDatos} />
    </div>
    <div className="form-group">
      <input type="text" className="form-control" id="inputUsuario" required placeholder="Usuario" name='usuario' onChange={recolectandoDatos}/>
    </div>
    <div className="form-group">
      <input type="text" className="form-control" id="inputPassword" required placeholder="Contraseña" name='password' onChange={recolectandoDatos}/>
    </div>
    <div className="form-group">
      <input type="email" className="form-control" id="inputcorreo" placeholder="Correo" name='correo'  onChange={recolectandoDatos}/>
    </div><br/>
    <div className="form-group" id="botones">
      <input type="submit" className="btn btn-primary" id="boton_iniciar_sesion" value={'Registrar'}/>
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

export default registrarUsuario;