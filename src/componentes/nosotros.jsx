import '../index.css'
import { Link } from "react-router-dom";
import { useState } from 'react';

const Nosotros = ()=> {
  
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
    <div className="menu"><img src="static/img/menu.png" width="65px;" onClick={Menu}/></div>
    
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
        
      <div className="div_nosotros">
      <h1 className="h1"> Quienes Somos</h1>
      <p className="parrafo_nosotros">
         Somos una compañia con la base del deseo de servir y mejorar la calidad de vida de los colombianos, nos dimos a la tarea de averiguar cuáles eran las necesidades que tenían,en lo referente a la mensajeria expresa<br/>

         InstaYA quiere brindar el mejor en brindarte el servicio excelente y oportuno que se encuentren a nivel nacional para que los colombianos puedan llegar sus encomiendas de manera erectiva
      </p>
    </div>

    <div className="div_nosotros">
      <h1  className="h1">Misión</h1>
      <p className="parrafo_nosotros">
          Brindar un excelente servicio y la prestación de servicios complementarios, obteniendo una rentabilidad adecuada que permita mantener un ambiente de desarrollo favorable y continuo para nuestros trabajadores, resultados para los accionistas y de impacto en el mejoramiento de las comunidades donde operamos.
      </p>
    </div>

    <div className="div_nosotros">
      <h1  className="h1">Visión</h1>
      <p className="parrafo_nosotros">
          Ser continuamente reconocidos como la empresa de mensajeria expresa  más importante de Colombia.   
      </p>
    </div>


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

export default Nosotros;

