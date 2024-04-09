//agregarReclamoInquilino.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
    
    function AgregarReclamoInquilino() {
      const token = localStorage.getItem('token');
      const navigate = useNavigate();
      const [validated, setValidated] = useState(false);
      const usuarioId = localStorage.getItem("id");
      const [unidadIdObtenida, setUnidadIdObtenida] = useState(null);
      const [edificioIdObtenido, setEdificioIdObtenido] = useState(null);



      useEffect(() => {
        const fetchUsuarioData = async () => {
            try {
                const response = await fetch(`/api/usuario/${usuarioId}`,{
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const userData = await response.json();
                // Assuming userData has a property named idUnidadAlquilada
                setUnidadIdObtenida(userData.idUnidadAlquilada);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchUnidadData = async () => {
          if (unidadIdObtenida === null) {
              // Handle the case where unidadIdObtenida is not available yet
              return;
          }

          try {
              const response = await fetch(`/api/unidad/${unidadIdObtenida}`,{
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }

              const unidadData = await response.json();
              // Assuming unidadData has a property named idEdificio
              setEdificioIdObtenido(unidadData.idEdificio);
          } catch (error) {
              console.error('Error fetching unidad data:', error);
          }
        };

        fetchUsuarioData();

        fetchUnidadData();


    }, [usuarioId, unidadIdObtenida]);
    
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
        const reclamosData = {};
    
        formData.forEach((value, key) => {
            reclamosData[key] = value;
        });
        
    
        try {
         
          const reclamosDataToSend = {
            ...formDataToObject(formData),
            idUsuario: usuarioId,
            idUnidad: unidadIdObtenida == "0" ? null : unidadIdObtenida,
            idEdificio: edificioIdObtenido,
        };


              console.log(reclamosDataToSend);
              

          const response = await fetch('/api/reclamos', {
            method: 'POST', // Cambia el método según la lógica de tu API (POST, PUT, etc.)
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reclamosDataToSend),
          });
    
          if (!response.ok) {
            throw new Error('Error al guardar el reclamo');
          }
    
          // Manejar la respuesta (redirigir, mostrar mensaje de éxito, etc.)
          navigate('/reclamo-inquilino'); // Redirigir a la página principal después de guardar la unidad
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
    
    return (
        <div className="container">
            <h2>Agregar Reclamo - Inquilino</h2>
            <p>Esta sección te permite editar la información del Reclamo. Por favor, completa los campos necesarios.</p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Edificio</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={edificioIdObtenido}
                            name="idEdificio"
                            disabled
                        />
                            <Form.Control.Feedback type="invalid">Selecciona un Edificio</Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Unidad/ParteComun</Form.Label>
                        <Form.Select
                        aria-label="Default select example"
                        className="custom-select"
                        required
                        defaultValue="0"
                        name="unidad"
                        >
                        <option value="0">Parte Común</option>
                        <option value={unidadIdObtenida}>Unidad Funcional</option>
                        </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona una Unidad</Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={usuarioId}
                            name="idUsuario"
                            disabled
                        />
                        <Form.Control.Feedback type="invalid">Selecciona un Usuario</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Descripcion</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            name="descripcion"
                        />
                        <Form.Control.Feedback type="invalid">Descripcion al problema</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom05">
                        <Form.Label>Estado</Form.Label>
                        <Form.Select
                        aria-label="Default select example"
                        className="custom-select"
                        required
                        defaultValue=""
                        name="estado"
                        >
                        <option value="" disabled hidden>Estado</option>
                        <option value="nuevo">nuevo</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Estado del problema</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom06">
                        <Form.Label>Tipo de Reclamo</Form.Label>
                        <Form.Select
                        aria-label="Default select example"
                        className="custom-select"
                        required
                        defaultValue=""
                        name="tipoReclamo"
                        >
                        <option value="" disabled hidden>Tipo de reclamo</option>
                        <option value="Problema">problema</option>
                        <option value="Oportunidad de mejora">Oportunidad de mejora</option>
                        <option value="Rotura">rotura</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">Pon un tipo de problema</Form.Control.Feedback>
                    </Form.Group>



                    <Form.Group as={Col} md="4" controlId="validationCustom07">
                        <Form.Label>Ubicacion</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Ubicacion del problema"
                            name="ubicacion"
                        />
                        <Form.Control.Feedback type="invalid">Selecciona ubicacion</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Button type="submit">Agregar Reclamo</Button>
            </Form>
        </div>
    );
}

export default AgregarReclamoInquilino;