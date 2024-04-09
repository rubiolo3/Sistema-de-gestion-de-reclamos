import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import './estiloMenuUsuario.css';


function MenuUsuario({ username, userType,onLogout  }) {
  const navigate = useNavigate();
  userType=localStorage.getItem("tipoUsuario");

  const handleLogout = () => {
    const confirmed = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    
    if (confirmed) {
      onLogout();
      navigate('/');
    }
  };


  
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
        <Link to="/menu" className="menu-link">Menu Inicial</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {userType === 'admin' && <Link to="/usuario" className="menu-link">Usuarios</Link>}
              {userType === 'admin' && <Link to="/edificio" className="menu-link">Edificios</Link>}
              {userType === 'admin' && <Link to="/unidad" className="menu-link">Unidades</Link>}
              {userType === 'admin' && <Link to="/reclamo-admin" className="menu-link">Reclamos</Link>}
              {userType === 'dueño' && <Link to="/reclamo-dueño" className="menu-link">Generar Reclamo</Link>}
              {userType === 'inquilino' && <Link to="/reclamo-inquilino" className="menu-link">Generar Reclamo</Link>}

            </Nav>
            <Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text style={{ userSelect: 'none'}}>Bienvenido {username && username.charAt(0).toUpperCase() + username.slice(1)}! ({userType})</Navbar.Text>
              </Navbar.Collapse>
              <Nav.Link eventKey={2} href="#logout" className="logout-link"onClick={handleLogout}>Cerrar Sesion</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </div>
  );
}

export default MenuUsuario;
