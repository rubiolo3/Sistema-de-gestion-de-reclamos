//agregarUsuario.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AgregarUsuario() {
  const token = localStorage.getItem('token');
  console.log(token);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [edificios, setEdificios] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [selectedEdificioId, setSelectedEdificioId] = useState(null);
  const [unidadAlquiladaVisible, setUnidadAlquiladaVisible] = useState(false); //booleano que en falso oscurece el edificio y la unidad alquilada cuando el usuario no es inquilino
  //definir userData para asegurarse que coincide con lo que usamos en el postman
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    usuario: '',
    tipoUsuario: '',
    idUnidadAlquilada: '',
    password: '',
    mail: '',
    dni: '',
  });

  //busca todos los edificios - TODOS - y las guarda en el arreglo "edificios"
  useEffect(() => {
    async function fetchEdificios() {
      try {
        const response = await fetch(`/api/edificios`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el edificio');
        }

        const data = await response.json();
        const filteredEdificios = data.filter((edificio, index, self) => index === self.findIndex((t) => t.id === edificio.id));
        setEdificios(filteredEdificios);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchEdificios();
  }, [token]);

  //busca todas las unidades - TODAS - y las guarda en el arreglo "unidades"
  useEffect(() => {
    async function fetchUnidades() {
      try {
        const response = await fetch('/api/unidades', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al guardar la unidad');
        }

        const data = await response.json();
        const filteredUnidades = data.filter((unidad, index, self) => index === self.findIndex((t) => t.id === unidad.id));
        setUnidades(filteredUnidades);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchUnidades();
  }, [token]);

  // convierte el userData en un objeto para enviarlo en el post
  const userDataToObject = (userData) => {
    const object = {};
    Object.entries(userData).forEach(([key, value]) => {
      object[key] = value;
    });
    return object;
  };

  // define que hace cuando el usuario hace click en submit (en este caso "agregar usuario")
  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    event.preventDefault();

    try {

      // userDataToSend lo usamos para agregar el identificador de unidad alquilada y mostrar lo que se va a enviar en el POST
      const userDataToSend = {
        ...userDataToObject(userData),
        idUnidadAlquilada: userData.idUnidadAlquilada,
      };

      console.log(userDataToSend);

      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      navigate('/menu');
    } catch (error) {
      console.error('Error:', error);
      alert("OPERACION INVALIDA");
    }
  };

  // al cambiar edificio modifica la variable SelectedEdificioId para luego mostrar solo las unidades del edificio seleccionado
  const handleEdificioChange = (e) => {
    const edificioId = e.target.value;
    console.log('Selected idEdificio:', edificioId);
    setSelectedEdificioId(edificioId);
    setUserData((prevData) => ({ ...prevData, idEdificio: edificioId }));
  };

// handleUnidadChange: esto soluciona que el selector con comportamiento asincronico no actualiza correctamente los valores y a veces queda almacenado el valor previo
  const handleUnidadChange = (e) => {
  
    // Update the userData directly using the callback form of setUserData
    setUserData((prevData) => {
      // Use the updated state to ensure you have the latest data
      const updatedData = { ...prevData, idUnidadAlquilada: e.target.value };
      console.log("Updated userData:", updatedData);
      return updatedData;
    });
  };

  //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
  //const handleVolverClick = () => {
  //  navigate('/');
  //};

  // handleChange guarda los valores que se van poniendo en el form en el userData
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // hace visible y modificable "edificio" y "unidad alquilada" si el tipo de usuario es inquilino
    if (name === 'tipoUsuario') {
      setUnidadAlquiladaVisible(value === 'inquilino');
    // sino deja idUnidadAlquilada en 0
      if (value !== 'inquilino') {
        setUserData((prevData) => ({ ...prevData, idUnidadAlquilada: '' }));
      }
    }
  };
    
    return (
        <div className="container">
            <h2>Agregar Nuevo Usuario</h2>
            <p>Esta sección te permite agregar un nuevo usuario. Por favor, completa los campos necesarios.</p>

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
              <Form.Group controlId="validationCustom04">
                <Form.Label>Tipo de Usuario</Form.Label>
                
                <Form.Select
                  aria-label="Default select example"
                  className="custom-select"
                  required
                  defaultValue=""
                  name="tipoUsuario"
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>Elige el tipo de usuario</option>
                  <option value="inquilino">inquilino</option>
                  <option value="dueño">dueño</option>
                  <option value="admin">admin</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, selecciona el tipo de usuario.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            </Row>
            <Row>


                <Form.Group as={Col} md="6" controlId="validationCustom05">
                    <Form.Label>Edificio</Form.Label>
                    <Form.Select 
                      aria-label="Edificio" 
                      className="custom-select" 
                      name="idEdificio" 
                      onChange={handleEdificioChange}
                      disabled={!unidadAlquiladaVisible}
                    >
                        <option value="" disabled hidden>
                            Selecciona un Edificio
                        </option>
                        {edificios.map(edificio => (
                            <option key={edificio.id} value={edificio.id}>{edificio.calle}</option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Selecciona un Edificio</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom06">
                    <Form.Label>Unidad Alquilada</Form.Label>
                    <Form.Select
                        aria-label="Unidad"
                        className="custom-select"
                        name="idUnidadAlquilada"
                        onChange={handleUnidadChange}
                        disabled={!unidadAlquiladaVisible}
                    >
                        <option value="" disabled hidden>
                            Selecciona una Unidad
                        </option>
                        {unidades
                         .filter((unidad) => unidad.idEdificio == selectedEdificioId && unidad.estado == "alquiler")
                        .map(unidad => (
                            <option key={unidad.id} value={unidad.id}>
                                {unidad.piso} {unidad.departamento}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">Selecciona una Unidad</Form.Control.Feedback>
                </Form.Group>

                </Row>

                <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom07">
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
              <Form.Group controlId="validationCustom08">
                <Form.Label>Mail</Form.Label>
                <Form.Control required type="email" placeholder="Mail" name="mail" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingresa un correo electrónico válido.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md="6">
              <Form.Group controlId="validationCustom09">
                <Form.Label>DNI</Form.Label>
                <Form.Control required type="text" pattern="[0-9]{8}" placeholder="DNI" name="dni" onChange={handleChange} />
                <Form.Control.Feedback type="invalid">Por favor, ingrese un DNI válido con 8 números.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

                <Button type="submit">Agregar Usuario</Button>
            </Form>
        </div>
    );
}

export default AgregarUsuario;
