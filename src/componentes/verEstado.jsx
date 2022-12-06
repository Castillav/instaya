import '../index.css'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from 'react';
import axios from 'axios';

const estado = () =>{

  const {id,usuario} = useParams();
  
  
  const [dato, setDatos] = useState({
    ciudadDestinatario:"",
    usuario: usuario

  });

 


  const [fecha_convertida,setFecha_convertida] = useState('');
  const [actualizarEstado, setActualizarEstado] = useState('');
  const [hora, setHora] = useState('');
  
  
  

  useEffect(
		function () {
			async function obtenerdatosId() {
				try {
					const response = await axios.get(`http://localhost:5000/api/obtenerdatos/${id}`);
					setDatos(response.data);
          console.log("DATOS ACT:" + response.data.estado);
				} catch (error) {
					console.log(error);
				}
			}
    //  const f = '23/11/2012';
      const convertir_fecha = new Date().toDateString(dato.dia);
      setFecha_convertida(convertir_fecha);
      setHora(dato.hora);
      setActualizarEstado(dato.estado);
			obtenerdatosId();
      console.log(dato.dia);
		},[]
		// eslint-disable-next-line react-hooks/exhaustive-deps
	);


  const restarFecha = ()=>{

    const hoy = new Date();
    const Mifecha = new Date(`${dato.dia} ${dato.hora}`);
    
    const diferencia  = hoy.getTime() - Mifecha.getTime() ;
    
     const horasTranscurridas = diferencia/1000/60/60;
    
    console.log("FECHA: " + horasTranscurridas);
    console.log("ESTADO: " + dato.estado);

    
    if(dato.estado == 'Cancelado'){

     document.formulario.estado.value = 'Cancelado';

    }

    else if(dato.estado == 'Guardado' && horasTranscurridas > 24){

      document.formulario.estado.value = 'Cumplido';
 
     }

     else if(dato.estado == 'Guardado' && horasTranscurridas < 24){

      document.formulario.estado.value = 'Guardado';
 
     }

    

    
  }

  restarFecha();
  

  function handleChange(event) {

  	setDatos({ ...dato, [event.target.name]: event.target.value });
 }

 console.log('DATOS: ' + dato.cedula)
  const  actualizarDatos = async (evento)=>{
    evento.preventDefault();

    async function actualizarDatos() {
			try {
				await axios.put(`http://localhost:5000/api/actualizar/${id}/${usuario}`, dato) 
        alert('Datos Actualizados Correctamente')
			} catch (error) {
				console.log(error);
			}
		}
		actualizarDatos();

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

  const campo = {
    pointerEvents: 'none'
  };

  
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

<form className="row g-3" name='formulario'  onSubmit={actualizarDatos}>
  <label className="label_titulo">Estado del Envio</label>
  <div className="col-md-10">
  <label  className="form-label">N° Servicio</label>
  <input type="text" className="form-control" id="inputId" style={campo} name='id' value={dato._id} onChange={handleChange}/>
</div>
<div className="col-md-10">
  <label  className="form-label">Destino</label>
  <input type="text" className="form-control" id="inputEstado" style={campo} name='ciudadDestinatario' value={dato. ciudadDestinatario} onChange={handleChange}/>
</div>
  <div className="col-md-10">
  <label  className="form-label">Estado</label>
  <input type="text" className="form-control" id="inputEstado" style={campo} name='estado'/>
</div>
 <br/>
  <div className="col-md-10" id="botones">
    <button type="button" className="btn btn-primary" ><Link className={'a_actualizar'} to={`/listado/${usuario}`}>Volver</Link></button>
  </div>
    

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

export default estado;