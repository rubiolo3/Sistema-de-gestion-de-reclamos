//editarUsuario.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './estiloEditarUsuario.css';

const EditarUsuario = () => {
  const token = localStorage.getItem('token');
  console.log(token)
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  
  useEffect(() => {
    async function fetchUsuaros() {
      try {
        const response = await fetch('/api/reclamos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los reclamos');
        }

        const data = await response.json();
        setUsuarios(data);

      } catch (error) {
        console.error('Error:', error);
        // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
      }
    }

    fetchUsuaros();
  }, [token]);


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
        const usuariosData = {};
    
        formData.forEach((value, key) => {
          usuariosData[key] = value;
        });

    try {

      
      
      const usuarioID = formData.get('id');
      const nombre = formData.get('nombre');
      const apellido = formData.get('apellido');
      const usuario = formData.get('usuario');
      const tipoUsuario = formData.get('tipoUsuario');
      const contraseña = formData.get('password');
      const dni = formData.get('dni');
      const mail = formData.get('mail');
   
      const usuarioData = {
          id: usuarioID,
          nombre: nombre,
          apellido: apellido,
          usuario: usuario,
          tipoUsuario: tipoUsuario,
          password: contraseña,
          dni: dni,
          mail: mail

        };



      const putURL = `/api/usuarios/${usuarioID}`;

      const response = await fetch(putURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      navigate('/usuario');

    } catch (error) {
      console.error('Error:', error);
      alert("OPERACION INVALIDA");
      // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
    }
  };


  return (
    <div className="container">
      <h2>Menú de Edición de Usuario</h2>
      <p>Esta sección te permite cambiar la información de usuario, si es que lo desea.</p>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>ID Usuario</Form.Label>
              <Form.Select aria-label="ID Usuario" className="custom-select" name="id">
              <option value="" disabled hidden>Selecciona un Usuario</option>
              {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.id}</option>
                ))}
             </Form.Select>
             <Form.Control.Feedback type="invalid">Selecciona un Usuario</Form.Control.Feedback>
          </Form.Group> 


          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              required
              type="text"
              name="nombre"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              required
              type="text"
              name="apellido"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              name="usuario"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

        <Form.Group controlId="validationCustom04">
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="custom-select"
                  required
                  defaultValue=""
                  name="tipoUsuario"
                >
                  <option value="" disabled hidden>Elige el tipo de usuario</option>
                  <option value="inquilino">inquilino</option>
                  <option value="dueño">dueño</option>
                  <option value="admin">admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, selecciona el tipo de usuario.</Form.Control.Feedback>
              </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="text"
              name="password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom06">
            <Form.Label>DNI</Form.Label>
            <Form.Control
              required
              type="text"
              name="dni"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un DNI válido con 8 números.
            </Form.Control.Feedback>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom07">
            <Form.Label>Mail</Form.Label>
            <Form.Control
              required
              type="text"
              name="mail"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button type="submit">Guardar Cambios</Button>
      </Form>
    </div>
  );
};

export default EditarUsuario;
