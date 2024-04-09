import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AgregarEdificio() {
  const token = localStorage.getItem('token');
  console.log(token)
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
    const edificioData = {};

    formData.forEach((value, key) => {
        edificioData[key] = value;
    });

    try {
      const response = await fetch('/api/edificios', {
        method: 'POST', // Cambia el método según la lógica de tu API (POST, PUT, etc.)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(edificioData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el edificio');
      }

      // Manejar la respuesta (redirigir, mostrar mensaje de éxito, etc.)
      navigate('/edificio'); // Redirigir a la página principal después de guardar la unidad
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
    }
  };

  const handleVolverClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Menú de Edificio</h2>
      <p>
        Esta sección te permite editar la información de los edificios. Por favor, completa los campos
        necesarios.
      </p>
      {/* Aquí puedes agregar lógica para cargar datos existentes si es necesario */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Calle</Form.Label>
            <Form.Control required type="text" name="calle"/>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control required type="text" name="ciudad"/>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Localidad</Form.Label>
            <Form.Control required type="text" name="localidad"/>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Guardar Nuevo Edificio</Button>
      </Form>
    </div>
  );
}

export default AgregarEdificio;