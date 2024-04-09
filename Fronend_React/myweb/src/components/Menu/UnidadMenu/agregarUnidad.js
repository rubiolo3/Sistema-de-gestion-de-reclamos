import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function EditarUnidad() {
  const token = localStorage.getItem('token');
  console.log(token)
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [dueños, setDueños] = useState([]);
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await fetch('/api/usuarios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
      }
    }

    fetchUsuarios();
  }, [token]); // Se ejecuta al montar el componente o cuando cambie 'token'

  useEffect(() => {
    const dueñosFiltrados = usuarios.filter(usuario => usuario.tipoUsuario === 'dueño');
    setDueños(dueñosFiltrados);
  }, [usuarios]);

  useEffect(() => {
    async function fetchEdificios() {
      try {
        const response = await fetch(`/api/edificios`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          
      
          if (!response.ok) {
            throw new Error('Error al obtener el edificio');
          }
    
          const data = await response.json();
          const filteredEdificios = data.filter((edificio, index, self) =>
          index === self.findIndex((t) => (
            t.id === edificio.id
          ))
        );
          setEdificios(filteredEdificios);
      } catch (error) {
        console.error('Error:', error);
        // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
      }
    }

    fetchEdificios();
  }, [token]); // Se ejecuta al montar el componente o cuando cambie 'token'


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
    const unidadData = {};

    formData.forEach((value, key) => {
      unidadData[key] = value;
    });
    

    try {
      // Realizar validación de idEdificio existente antes de crear la unidad
      const unidadDataToSend = {
        ...formDataToObject(formData)
      };


      const response = await fetch('/api/unidades', {
        method: 'POST', // Cambia el método según la lógica de tu API (POST, PUT, etc.)
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(unidadDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la unidad');
      }

      // Manejar la respuesta (redirigir, mostrar mensaje de éxito, etc.)
      navigate('/unidad'); // Redirigir a la página principal después de guardar la unidad
    } catch (error) {
      console.error('Error:', error);
      alert("OPERACION INVALIDA");
      // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
    }
  };
  const formDataToObject = (formData) => {
    const object = {};
    formData.forEach((value, key) => {
      object[key] = value;
    });
    return object;
  };


  const handleVolverClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Menú de Unidad</h2>
      <p>
        Esta sección te permite editar la información de la unidad. Por favor, completa los campos
        necesarios.
      </p>
      {/* Aquí puedes agregar lógica para cargar datos existentes si es necesario */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>ID Edificio</Form.Label>
            <Form.Select aria-label="Edificio" className="custom-select" name="idEdificio">
              <option value="" disabled hidden>Selecciona un Edificio</option>
              {edificios.map(edificio => (
                <option key={edificio.id} value={edificio.id}>{edificio.calle}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Propietario</Form.Label>
            <Form.Select aria-label="Propietario" className="custom-select" name="idPropietario">
              <option value="" disabled hidden>Selecciona un Propietario</option>
              {dueños.map(dueño => (
                <option key={dueño.id} value={dueño.id}>{dueño.nombre} {dueño.apellido}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Selecciona un Propietario</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Piso</Form.Label>
            <Form.Control required type="text" placeholder="Ej: 12" name="piso"/>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Departamento</Form.Label>
            <Form.Control required type="text" placeholder="Ej: B" name="departamento"/>
            <Form.Control.Feedback>✅</Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Estado</Form.Label>
              <Form.Select aria-label="Default select example" className="custom-select" name="estado">
                <option value="" disabled hidden>Estados</option>
                <option value="alquiler">alquiler</option>
                <option value="habitada">habitada</option>
                <option value="vacia">vacia</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Por favor, selecciona una opcion.</Form.Control.Feedback>
            </Form.Group>
        </Row>

        <Button type="submit">Guardar Nueva Unidad</Button>
      </Form>
    </div>
  );
}

export default EditarUnidad;