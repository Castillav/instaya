import '../index.css'
import { Link, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';


const listado = () =>{

  const [lista, setLista] = useState([]);
  const [fechas, setFechas] = useState([]);

  const {usuario} = useParams();




  useEffect(()=>{
    async function obtenerLista() {
      
      try {
        const response = await axios.get(`https://instaya-lovat.vercel.app/api/lista/${usuario}`);
        setLista(response.data);
       
       
      } catch (error) {
        console.log(error);
      }
    }
  
    obtenerLista();
  
    return;

  }),[]


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
        <li className='li'><Link className={'routerLink'} to={`/listado/${usuario}`}>LISTADO</Link></li>
        <li className='li'><Link className={'routerLink'} to={`/nosotros/${usuario}`}>NOSOTROS</Link></li>
        <div className='div_usuario'><label className='label_usuario'>{usuario}</label><br></br>
        <Link className={'cerrar_sesion'} to={'/'}>Cerrar Sesión</Link>
        </div>
        </ul>
      </div>
     </nav>
</header>
 
<div className="contenido"> 
 <label className='titulo_usuario'>Usuario:</label><label className='label_usuario'> {usuario}</label>
<label className="label_titulo">Listado de Ordenes</label><br/>
      <button type="button" className="btn btn-warning"><Link className={'a_registrarse'} to={`/registrar_orden/${usuario}`}>Crear Orden</Link></button>
     
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#Servicio</th>
          <th scope="col">Fecha</th>
          <th scope="col">ciudad Entrega</th>
          <th scope="col" >Dirección Entrega</th>
          <th scope="col">Estado</th>
          <th scope="col">Actualizar</th>
          <th scope="col">Cancelar</th>
        </tr>
      </thead>
     
      <tbody >
      {lista.map((listado)=>
      
        <tr key={listado._id}>
          <td>{listado._id}</td>
          <td>{listado.dia}</td>
          <td>{listado.ciudadDestinatario}</td>
          <td>{listado.direccionDestinatario}</td>
          <td><button type="button" className="btn btn-primary"><Link className={'a_actualizar'} to={`/estado/${listado._id}/${usuario}`}>Ver Estado</Link></button></td>
          <td><button type="button" className="btn btn-primary"><Link className={'a_actualizar'} to={`/actualizar/${listado._id}/${usuario}`}>Actualizar</Link></button></td>
          <td><button type="button" className="btn btn-primary"><Link className={'a_actualizar'} to={`/cancelar/${listado._id}/${usuario}`}>Cancelar</Link></button></td>
        </tr>)}
      </tbody>
    </table>

                                                                
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

export default listado;