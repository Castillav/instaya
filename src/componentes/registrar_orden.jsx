import '../index.css'
import { Link, useNavigate, useParams} from "react-router-dom";
import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Municipios from './municipios';

const registrarOrden = () =>{

 const {usuario} = useParams();
 const navigate = useNavigate();
 const [date,setDate] = useState('');
 const [mensaje,setMensaje] = useState({display:'none'});
 
  const [orden, setOrdenes] = useState({
    dia: '',
    hora: '',
    ancho: '',
    largo: '',
    alto: '',
    peso: '',
    direccionRecogida: '',
    ciudadRecogida: '',
    cedula: '',
    direccionDestinatario: '',
    ciudadDestinatario: '',
    estado:'Guardado',
    usuario:usuario
  })

  const recolectandoDatos = (evento) =>{
   
    setOrdenes({
      ...orden,[evento.target.name]:evento.target.value
    })

  }


    
  const enviarDatos = async (evento)=>{
    evento.preventDefault();

    if(orden.dia === ''||
    orden.hora === ''||
    orden.ancho === ''||
    orden.largo === ''||
    orden.alto === ''||
    orden.peso === ''||
    orden.direccionRecogida === ''||
    orden.ciudadRecogida === ''||
    orden.cedula === ''||
    orden.direccionDestinatario === ''||
    orden.ciudadDestinatario === ''
    ){
   
     setMensaje({display:'inline'});
     alert('Debe llenar todos los campos')
   
    }else{
  
    axios.post("http://localhost:5000/api/agregarorden", orden)
    .then((response) => {
      setOrdenes(response.data);
      alert('Registrado Exitosamente');
      navigate(`/listado/${usuario}`);
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

   useEffect(()=>{

    const fecha = ()=>{
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
  
      setDate(tomorrow.toISOString().split("T")[0]);
  
     }

     fecha();
    
   },[])
   
 
   
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

<form className="row g-3" onSubmit={enviarDatos}>
  <label className="label_titulo">Registro de Ordenes(Recogida)</label>
  <div className="mensaje" style={mensaje} >Debe llenar todos los campos</div>
  <div className="col-md-5">
    <label className="form-label">Dia de recolección</label>
    <input type="date" className="form-control"name='dia' id="inputDia" min={date}  onChange={recolectandoDatos} />
  </div>
  <div className="col-md-5">
    <label  className="form-label">Hora de recolección</label>
    <input type="time" className="form-control" name='hora' id="inputHora" onChange={recolectandoDatos} />
  </div>
  <div className="row_medidas">
  <div className="col-3">
    <label  className="form-label">Ancho(cm)</label>
    <input type="number" className="form-control" name='ancho' id="inputAncho"  onChange={recolectandoDatos} />
  </div>
  <div className="col-3">
    <label  className="form-label">Alto(cm)</label>
    <input type="number" className="form-control" name='alto' id="inputAlto"  onChange={recolectandoDatos} />
  </div>
  <div className="col-3">
    <label  className="form-label">Largo(cm)</label>
    <input type="number" className="form-control" name='largo' id="inputLargo"  onChange={recolectandoDatos} />
  </div>
  </div>
  <div className="col-md-10">
    <label className="form-label">Peso(kg)</label>
    <input type="number" className="form-control" name='peso' id="inputPeso" onChange={recolectandoDatos} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección de Recogida</label>
    <input type="text" className="form-control" name='direccionRecogida' id="inputDireccion_d"  onChange={recolectandoDatos} />
  </div>
  <div className="col-md-10">
  <label  className="form-label">Ciudad de Recogida </label>
  <input className="form-control"  list="lista" name='ciudadRecogida' id="ciudadRecogida" onChange={recolectandoDatos} />
  <datalist className='datolista' id='lista'>
     <Municipios></Municipios>
  </datalist>
 </div>

  <div className="col-md-10">
    <label  className="form-label">Cedula/Nit Destinatario</label>
    <input type="number" className="form-control" name='cedula' id="inputCedula"   onChange={recolectandoDatos} />
  </div>
  <div className="col-md-10">
    <label  className="form-label">Dirección Entrega</label>
    <input type="text" className="form-control" name='direccionDestinatario' id="inputDireccion_d" onChange={recolectandoDatos} />
  </div>
  <div className="col-md-10">
  <label  className="form-label">Ciudad Entrega</label>
  <input type="text" className="form-control"  list="lista" name='ciudadDestinatario' id="inputCiudad_d" onChange={recolectandoDatos} />
  <datalist id='lista'>
     <Municipios></Municipios>
  </datalist>
</div><br/>
  <div className="col-md-10" id="botones">
    <input type="submit" className="btn btn-primary" value={'Crear Orden'} />
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

export default registrarOrden;