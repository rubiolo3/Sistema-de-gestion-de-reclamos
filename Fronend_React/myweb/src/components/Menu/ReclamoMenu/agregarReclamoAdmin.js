//agregarReclamoAdmin.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
    
    function AgregarReclamoAdmin() {
      const token = localStorage.getItem('token');
      console.log(token)
      const navigate = useNavigate();
      const [validated, setValidated] = useState(false);
      const [usuarios, setUsuarios] = useState([]);
      const [edificios, setEdificios] = useState([]);
      const [unidades, setUnidades] = useState([]);
      const [selectedEdificioId, setSelectedEdificioId] = useState(null);
      
    
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
            const filteredUsuarios = data.filter((usuario, index, self) =>
            index === self.findIndex((t) => (
              t.id === usuario.id
            ))
          );
            setUsuarios(filteredUsuarios);
          } catch (error) {
            console.error('Error:', error);
            // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
          }
        }
    
        fetchUsuarios();
      }, [token]); // Se ejecuta al montar el componente o cuando cambie 'token'
    
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
    
      useEffect(() => {
        async function fetchUnidades() {
          try {
            const response = await fetch('/api/unidades', {
                method: 'GET', // Cambia el método según la lógica de tu API (POST, PUT, etc.)
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
              });
        
              if (!response.ok) {
                throw new Error('Error al guardar la unidad');
              }
    
              const data = await response.json();
              const filteredUnidades = data.filter((unidad, index, self) =>
              index === self.findIndex((t) => (
                t.id === unidad.id
              ))
            );
              setUnidades(filteredUnidades);

  
    
          } catch (error) {
            console.error('Error:', error);
            // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
          }
        }
    
        fetchUnidades();
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
        const reclamosData = {};
    
        formData.forEach((value, key) => {
            reclamosData[key] = value;
        });
        
    
        try {
         
            const reclamosDataToSend = {
                ...formDataToObject(formData),
              };

              if(reclamosDataToSend.idUnidad==0){
                reclamosDataToSend.idUnidad=null;
              };

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
          navigate('/reclamo-admin'); // Redirigir a la página principal después de guardar la unidad
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

      const handleEdificioChange = (e) => {
        const edificioId = e.target.value;
        console.log('Selected idEdificio:', edificioId);
        setSelectedEdificioId(edificioId);
      };


      console.log(unidades)
      
    
    
    return (
        <div className="container">
            <h2>Agregar Reclamo - Administrador</h2>
            <p>Esta sección te permite editar la información del Reclamo. Por favor, completa los campos necesarios.</p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">

                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>Edificio</Form.Label>
                            <Form.Select aria-label="Edificio" className="custom-select" name="idEdificio" onChange={handleEdificioChange}>
                            <option value="" disabled hidden>Selecciona un Edificio</option>
                              {edificios.map(edificio => (
                                  <option key={edificio.id} value={edificio.id}>{edificio.calle}</option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona un Edificio</Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Unidad/ParteComun</Form.Label>
                            <Form.Select aria-label="Unidad" className="custom-select" name="idUnidad">
                            <option value="" disabled hidden>Selecciona una Unidad</option>
                            <option value="0">parteComun</option>
                            {unidades
                              .filter((unidad) => unidad.idEdificio == selectedEdificioId)
                              .map(unidad => (
                            <option key={unidad.id} value={unidad.id}>
                                {unidad.piso} {unidad.departamento}
                            </option>
                        ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona una Unidad</Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>Usuario</Form.Label>
                            <Form.Select aria-label="Usuario" className="custom-select" name="idUsuario">
                            <option value="" disabled hidden>Selecciona un Usuario</option>
                            {usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellido}</option>
                            ))}
                            </Form.Select>
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

export default AgregarReclamoAdmin;
