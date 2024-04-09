import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './estiloRegistro.css';

function Registro() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form);
    const userData = {};

    formData.forEach((value, key) => {
      userData[key] = value;
    });

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      // Aquí podrías redirigir al usuario a otra página o realizar alguna acción
      navigate('/'); // Redirigir a la página principal después del registro
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
    }
  };

  const handleVolverClick = () => {
    navigate('/');
  };

  const handleChange = (event) => {
    // Puedes manejar cambios en los campos si es necesario
    // Por ejemplo, puedes guardar los cambios en el estado si necesitas realizar alguna acción.
  };

  return (
    <div className="registro-container">
      <div className="registro-formulario">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Nombre</Form.Label>
                <Form.Control required type="text" name="nombre" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingresa un nombre válido.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="validationCustom02">
                <Form.Label>Apellido</Form.Label>
                <Form.Control required type="text" name="apellido" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingresa un apellido válido.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom03">
                <Form.Label>Usuario</Form.Label>
                <Form.Control required type="text" name="usuario" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingresa un usuario válido.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="validationCustom07">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom-select"
                  required
                  defaultValue=""
                  name="tipoUsuario"
                >
                  <option value="" disabled hidden>Elige el tipo de usuario</option>
                  <option value="admin">admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, selecciona el tipo de usuario.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom04">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Por favor, ingresa una contraseña válida.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Form.Group controlId="validationCustom06">
                <Form.Label>Mail</Form.Label>
                <Form.Control required type="email" placeholder="Mail" name="mail" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingresa un correo electrónico válido.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom05">
                <Form.Label>DNI</Form.Label>
                <Form.Control required type="text" pattern="[0-9]{8}" placeholder="DNI" name="dni" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingrese un DNI válido con 8 números.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md="6">
              <Button type="submit" className="btn-primary">Registrarse!</Button>
              <Button type="button" className="btn-primary" onClick={handleVolverClick}>Volver</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Registro;
