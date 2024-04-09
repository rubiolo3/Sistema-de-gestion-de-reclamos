import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './estiloDeBoton.css';

const BotonInicial = () => {
  return (
    <div className="fondo-gris-oscuro">
      <div className="centrar-formulario">
        <div className="title">
          <h1>Bienvenidos</h1>
        </div>
        <div className="description">
          <p>Por favor, seleccione una de las opciones para continuar</p>
        </div>
        <div className="centro-horizontal">
          <Link to="/iniciar-sesion">
            <Button variant="primary" size="lg" style={{ fontSize: '20px', margin: '10px 20px 10px 10px' }}>Iniciar Sesión</Button>
          </Link>
          <Link to="/registrarse">
            <Button variant="secondary" size="lg" style={{ fontSize: '20px', margin: '10px 10px 10px 20px' }}>Registrarse</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BotonInicial;
