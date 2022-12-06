import '../index.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CambiarClave = ()=> {

const navigate = useNavigate();
const {usuario }= useParams();
const {id} = useParams();
const [clave, setClave] = useState({password:''});
const [mensaje,setMensaje] = useState({display:'none'});

useEffect(()=>{
  async function obtenerLista() {
    
    try {
      const response = await axios.get(`https://instaya-lovat.vercel.app/api/listado/${id}`);
      console.log("Response: " + response.data.usuario);
     
    } catch (error) {
      console.log(error);
    }
  }

  obtenerLista();

  return;

},[])


const  enviarDatos = async (evento)=>{
  evento.preventDefault();

  if(clave.password === ''){
   
    setMensaje({display:'inline'});
    
   }else{

  async function actualizarDatos() {
    try {
      await axios.put(`https://instaya-lovat.vercel.app/api/actualizarclave/${id}`, clave) 
      alert('Contraseña Nueva Generada Exitosamente')
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  actualizarDatos();

}

}

function cambio(event) {

  setClave({ ...clave, [event.target.name]: event.target.value });
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
         <label className="label_titulo">Cambiar Contraseña</label>
         <div className="mensaje" style={mensaje} >Debe colocar una contraseña nueva</div>
       <div className="form-group">
          <input type="text" className="form-control" name='usuario'  placeholder="Usuario" disabled value={usuario}/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" name='password'  placeholder="Nueva Contraseña"  value={clave.password} onChange={cambio} />
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

export default CambiarClave
