//Apps.js

//Imports Generales
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BotonInicial from './components/Ingreso/botones/BotonesInicial';
import IniciarSesion from './components/Ingreso/IniciarSesion/iniciarSesion';
import Registro from './components/Ingreso/Registrarse/registro';
import Error404 from './components/Error/error404';
import MenuInicial from './components/Menu/MenuInicial/menuInicial';
import MenuUsuario from './components/Menu/NavBar/menuUsuario';

//Imports Admin
import Usuario from './components/Menu/UsuarioMenu/usuario';
import EditarUsuario from './components/Menu/UsuarioMenu/editarUsuario';
import AgregarUsuario from './components/Menu/UsuarioMenu/agregarUsuario';
import EliminarUsuario from './components/Menu/UsuarioMenu/eliminarUsuario';

import Edificio from './components/Menu/EdificioMenu/edificio';
import AgregarEdificio from './components/Menu/EdificioMenu/agregarEdificio';

import Unidad from './components/Menu/UnidadMenu/unidad';
import AgregarUnidad from './components/Menu/UnidadMenu/agregarUnidad';

import ReclamoAdmin from './components/Menu/ReclamoMenu/reclamoAdmin';
import AgregarReclamoAdmin from './components/Menu/ReclamoMenu/agregarReclamoAdmin';
import EditarReclamo from './components/Menu/ReclamoMenu/editarReclamo';
import ImagenReclamoAdmin from './components/Menu/ReclamoMenu/imagenReclamoAdmin';

//Imports Dueño
import ReclamoDueño from './components/Menu/ReclamoMenu/reclamodueño';
import AgregarReclamoDueño from './components/Menu/ReclamoMenu/agregarReclamoDueño';
import ImagenReclamoDueño from './components/Menu/ReclamoMenu/imagenReclamoDueño';

//Imports Inquilino
import ReclamoInquilino from './components/Menu/ReclamoMenu/reclamoInquilino';
import AgregarReclamoInquilino from './components/Menu/ReclamoMenu/agregarReclamoInquilino';
import ImagenReclamoInquilino from './components/Menu/ReclamoMenu/imagenReclamoInquilino';











function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState(""); 

  const handleLogin = (username, userType) => {
    setLoggedIn(true);
    setUsername(username);
    setUserType(userType);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };


  
  return (
    <Router>
      <div className="App">
      {isLoggedIn && <MenuUsuario username={username} userType={userType} onLogout={handleLogout} />}
        <Routes>
          {/* Route Paths Generales */}

          <Route path="/" element={<BotonInicial />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion onLogin={handleLogin} />} />
          <Route path="/registrarse" element={<Registro />} />
          <Route path="/menuUsuario" element={<MenuUsuario />} />
          <Route path="/menu" element={<MenuInicial />} />
          <Route path="/*" element={<Error404 />} />

          {/* Route Paths Administradores */}
         
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/agregar-usuario" element={<AgregarUsuario />} />
          <Route path="/editar-usuario" element={<EditarUsuario userData onSave />} />
          <Route path="/eliminar-usuario" element={<EliminarUsuario />} />

          <Route path="/edificio" element={<Edificio />} />
          <Route path="/agregar-edificio" element={<AgregarEdificio />} />

          <Route path="/unidad" element={<Unidad />} />
          <Route path="/agregar-unidad" element={<AgregarUnidad />} />

          <Route path="/reclamo-admin" element={<ReclamoAdmin />} />
          <Route path="/agregar-reclamo-admin" element={<AgregarReclamoAdmin />} />
          <Route path="/editar-reclamo" element={<EditarReclamo />} />
          <Route path="/imagen-reclamo-admin" element={<ImagenReclamoAdmin />} />

          {/* Route Paths Dueños */}
          <Route path="/reclamo-dueño" element={<ReclamoDueño />} />
          <Route path="/agregar-reclamo-dueño" element={<AgregarReclamoDueño />} />
          <Route path="/imagen-reclamo-dueño" element={<ImagenReclamoDueño />} />

          {/* Route Paths Inquilinos */}
          <Route path="/reclamo-inquilino" element={<ReclamoInquilino />} />
          <Route path="/agregar-reclamo-inquilino" element={<AgregarReclamoInquilino />} />
          <Route path="/imagen-reclamo-inquilino" element={<ImagenReclamoInquilino />} />

        </Routes>
      </div>
    </Router>
  );
}



export default App;
