import '../index.css'
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect, useState } from 'react';
import axios from 'axios';

const cancelar = () =>{

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
    estado:""

  });

  useEffect(
		function () {
			async function obtenerdatosId() {
				try {
					const response = await axios.get(`https://instaya-lovat.vercel.app/api/obtenerdatos/${id}`);
					setDatos(response.data);
          console.log(response.data);
				} catch (error) {
					console.log(error);
				}
			}
			obtenerdatosId();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
		
	);

  
  function handleChange(event) {

  	setDatos({ ...dato, [event.target.name]: event.target.value });
 }

 console.log('DATOS: ' + dato.cedula)
  const  actualizarDatos = async (evento)=>{
    evento.preventDefault();

   if(document.formulario.estado.value == 'Cancelado'){

     alert('La recogida no se puede cancelar porque ya está en estado Cancelado')

  }else{

    async function actualizarDatos() {
			try {
				await axios.put(`https://instaya-lovat.vercel.app/api/actualizar/${id}/${usuario}`, {estado:'Cancelado'}) 
        alert('La recogida fue cancelada');
        navigate(`/listado/${usuario}`);
			} catch (error) {
				console.log(error);
			}
		}
		actualizarDatos();

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
 
<div className="contenido_registrar_orden"> 

<form className="row g-3" name='formulario'  onSubmit={actualizarDatos}>
  <label className="label_titulo">Cancelacion de Ordenes(Recogida)</label>
  <div className="col-md-5">
    <label  className="form-label">Dia de recolección</label>
    <input type="date" className="form-control" id="inputDia" style={campo} name='dia' value={dato.dia} onChange={handleChange}/>
  </div>
  <div className="col-md-5">
    <label  className="form-label">Hora de recolección</label>
    <input type="time" className="form-control" id="inputHora" style={campo}  name='hora' value={dato.hora} onChange={handleChange} />
  </div>
  <div className="col-md-10">
  <label  className="form-label">Estado</label>
  <input type="text" className="form-control" id="inputEstado" style={campo} name='estado' value={dato.estado} onChange={handleChange}/>
</div>
  <div className="row_medidas">
  <div className="col-3">
    <label  className="form-label">Ancho(cm)</label>
    <input type="number" className="form-control" id="inputAncho" style={campo} name='ancho' value={dato.ancho} onChange={handleChange}/>
  </div>
  <div className="col-3">
    <label  className="form-label">Alto(cm)</label>
    <input type="number" className="form-control" id="inputAlto" name='alto' style={campo}  value={dato.alto} onChange={handleChange} />
  </div>
  <div className="col-3">
    <label  className="form-label">Largo(cm)</label>
    <input type="number" className="form-control" id="inputLargo" name='largo' style={campo} value={dato.largo} onChange={handleChange}/>
  </div>
  </div>
  <div className="col-md-10">
    <label className="form-label">Peso(kg)</label>
    <input type="text" className="form-control" id="inputPeso" style={campo} name='peso' value={dato.peso} onChange={handleChange}/>
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección de Recogida</label>
    <input type="text" className="form-control" id="inputDireccion_d" style={campo} name='direccionRecogida' value={dato.direccionRecogida} onChange={handleChange} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Ciudad de Recogida</label>
    <input type="text" className="form-control" id="inputDireccion_d" style={campo} name='ciudadRecogida' value={dato.ciudadRecogida} onChange={handleChange} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Cedula/Nit Destinatario</label>
    <input type="text" className="form-control" id="inputTelefono_d" style={campo} name='cedula' value={dato.cedula} onChange={handleChange} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección Entrega</label>
    <input type="text" className="form-control" id="inputCiudad_d" style={campo} name='direccionDestinatario' value={dato.direccionDestinatario} onChange={handleChange}/>
  </div>
  <div className="col-md-10">
    <label className="form-label">Ciudad Entrega</label>
    <input type="text" className="form-control" id="inputCiudad_d"  style={campo} name='ciudadDestinatario' value={dato.ciudadDestinatario} onChange={handleChange}/>
  </div><br/>
  <div className="col-md-10" id="botones">
    <button type="submit" className="btn btn-primary" >Cancelar Orden</button>
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

export default cancelar;