import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from '../../Autenticacion/authService';
import { jwtDecode } from 'jwt-decode';

function IniciarSesion({ onLogin }) {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;

      if (form.checkValidity() === false) {
        event.stopPropagation();
      } else {
        const usuario = form.elements['usuario'].value;
        const password = form.elements['password'].value;

        console.log('Contraseña enviada al backend:', password); 
        console.log('Usuario:', usuario);
        console.log('Contraseña:', password);
        

        const token = await login(usuario, password);
        console.log(token)
        
        if (token) {
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode(token);
          localStorage.setItem("tipoUsuario", decodedToken.tipoUsuario);
          localStorage.setItem("id", decodedToken.userId);
          onLogin(usuario);
          navigate('/menu');
        } else {
          setError('Usuario o contraseña incorrectos');
        }
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Error, Datos incorrectos');
    } finally {
      setValidated(true);
    }
  };

  const handleVolverClick = () => {
    navigate('/');
  };

  return (
    <div className="fondo-gris-oscuro">
      <div className="centrar-formulario">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Usuario</Form.Label>
            <Form.Control name="usuario" required type="text" />
            <Form.Control.Feedback type="invalid">Por favor, ingresa un usuario válido.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="validationCustom02">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name="password" required type="password" />
            <Form.Control.Feedback type="invalid">Por favor, ingresa una contraseña válida.</Form.Control.Feedback>
          </Form.Group>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>Ingresar</Button>
          <Button type="button" className="btn-primary" style={{ marginTop: '10px' }} onClick={handleVolverClick}>Volver</Button>
        </Form>
      </div>
    </div>
  );
}

export default IniciarSesion;
