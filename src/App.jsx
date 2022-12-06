import {BrowserRouter, Route, Routes,NavLink  } from 'react-router-dom';
import Principal from './componentes/index';
import Registrar_orden from './componentes/registrar_orden';
import Registrar_usuario from './componentes/registrar_usuario';
import Listado from './componentes/listado';
import Actualizar from './componentes/actualizar';
import Nosotros from './componentes/nosotros';
import NosotrosSesion from './componentes/nosotrosSesion';
import Cancelar from './componentes/cancelar';
import Estado from './componentes/verEstado';
import RecuperarClave from './componentes/recuperarClave';
import CambiarClave from './componentes/cambiarClave';


const App = () =>{

   return(
     <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Principal/>} />
            <Route path='/registrar_orden/:usuario' element={<Registrar_orden/>} />
            <Route exact path='/registrar_usuario' element={<Registrar_usuario/>} />
            <Route exact path='/listado/:usuario' element={<Listado/>} />
            <Route exact path='/actualizar/:id/:usuario' element={<Actualizar/>} />
            <Route exact path='/cancelar/:id/:usuario' element={<Cancelar/>} />
            <Route exact path='/estado/:id/:usuario' element={<Estado/>} />
            <Route exact path='/nosotros/:usuario' element={<NosotrosSesion/>}/>
            <Route exact path='/nosotros' element={<Nosotros/>}/>
            <Route exact path='/recuperar' element={<RecuperarClave/>}/>
            <Route exact path='/cambiar/:id/:usuario' element={<CambiarClave/>}/>
        </Routes>
     </BrowserRouter>
     </div>
   );

}

export default App;