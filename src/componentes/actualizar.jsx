import '../index.css'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from 'react';
import axios from 'axios';
import Municipios from './municipios';

const actualizar = () =>{

  const {id,usuario} = useParams();
  const navigate = useNavigate();
  
  
  const [dato, setDatos] = useState({

    dia:"",
    hora:"",
    ancho:"",
    largo:"",
    alto:"",
    peso:"",
    direccionRecogida:"",
    ciudadRecogida:"",
    cedula:"",
    direccionDestinatario:"",
    ciudadDestinatario:"",
    estado:"",
    usuario: usuario

  });

 


  const [fecha_convertida,setFecha_convertida] = useState('');
  const [actualizarEstado, setActualizarEstado] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje,setMensaje] = useState({display:'none'});
  
  

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
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
		
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

    if(dato.dia === ''||
    dato.hora === ''||
    dato.ancho === ''||
    dato.largo === ''||
    dato.alto === ''||
    dato.peso === ''||
    dato.direccionRecogida === ''||
    dato.ciudadRecogida === ''||
    dato.cedula === ''||
    dato.direccionDestinatario === ''||
    dato.ciudadDestinatario === ''
    ){
   
     setMensaje({display:'inline'});
     alert('No puede haber campos vacios')
   
    }else{

      if(document.formulario.estado.value == 'Cumplido'){
        
         alert('No se puede actualizar porque la recogida está Cumplida')

      }else if(document.formulario.estado.value == 'Cancelado'){

        alert('No se puede actualizar porque la recogida está Cancelada')

     }else{

    async function actualizarDatos() {
			try {
				await axios.put(`http://localhost:5000/api/actualizar/${id}/${usuario}`, dato) 
        alert('Datos Actualizados Correctamente');
        navigate(`/listado/${usuario}`);
			} catch (error) {
				console.log(error);
			}
		}
		actualizarDatos();
    }
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
 
<div className="contenido_registrar_orden"> 

<form className="row g-3" name='formulario'  onSubmit={actualizarDatos}>
  <label className="label_titulo">Actualizacion de Ordenes(Recogida)</label>
  <div className="mensaje" style={mensaje} >No puede haber campos vacios</div>
  <div className="col-md-5">
    <label  className="form-label">Dia de recolección</label>
    <input type="date" className="form-control" id="inputDia" name='dia' value={dato.dia}  onChange={handleChange}/>
  </div>
  <div className="col-md-5">
    <label  className="form-label">Hora de recolección</label>
    <input type="time" className="form-control" id="inputHora"  name='hora' value={dato.hora} onChange={handleChange} />
  </div>
  <div className="col-md-10">
  <label  className="form-label">Estado</label>
  <input type="text" className="form-control" id="inputEstado" name='estado' disabled />
</div>
  <div className="row_medidas">
  <div className="col-3">
    <label  className="form-label">Ancho(cm)</label>
    <input type="number" className="form-control" id="inputAncho" name='ancho' value={dato.ancho} onChange={handleChange}/>
  </div>
  <div className="col-3">
    <label  className="form-label">Alto(cm)</label>
    <input type="number" className="form-control" id="inputAlto" name='alto'  value={dato.alto} onChange={handleChange} />
  </div>
  <div className="col-3">
    <label  className="form-label">Largo(cm)</label>
    <input type="number" className="form-control" id="inputLargo" name='largo' value={dato.largo} onChange={handleChange}/>
  </div>
  </div>
  <div className="col-md-10">
    <label className="form-label">Peso(kg)</label>
    <input type="text" className="form-control" id="inputPeso"  name='peso' value={dato.peso} onChange={handleChange}/>
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección de Recogida</label>
    <input type="text" className="form-control" id="inputDireccion_d" name='direccionRecogida' value={dato.direccionRecogida} onChange={handleChange} />
  </div>
  <div className="col-md-10">
  <label  className="form-label">Ciudad de Recogida </label>
  <input className="form-control"  list="lista" name='ciudadRecogida' id="ciudadRecogida"  value={dato.ciudadRecogida} onChange={handleChange} />
  <datalist className='datolista' id='lista'>
     <Municipios></Municipios>
  </datalist>
</div>
  <div className="col-md-10">
    <label  className="form-label">Cedula/Nit Destinatario</label>
    <input type="text" className="form-control" id="inputTelefono_d" name='cedula' value={dato.cedula} onChange={handleChange} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección Entrega</label>
    <input type="text" className="form-control" id="inputCiudad_d" name='direccionDestinatario' value={dato.direccionDestinatario} onChange={handleChange}/>
  </div>
 <div className="col-md-10">
  <label  className="form-label">Ciudad Entrega </label>
  <input type="text" className="form-control"  list="lista" name='ciudadDestinatario' id="inputCiudad_d"  value={dato.ciudadDestinatario} onChange={handleChange} />
  <datalist id='lista'>
     <Municipios></Municipios>
  </datalist>
</div><br/>
  <div className="col-md-10" id="botones">
    <button type="submit" className="btn btn-primary" >Actualizar Orden</button>
    <button className="btn btn-primary" id="volver"><Link className={'a_actualizar'} to={`/listado/${usuario}`}>Volver</Link></button>
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

export default actualizar;