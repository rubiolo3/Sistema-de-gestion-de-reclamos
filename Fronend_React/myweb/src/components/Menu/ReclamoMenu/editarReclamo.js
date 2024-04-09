//editarReclamo.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
    
    function EditarReclamo() {
      const token = localStorage.getItem('token');
      console.log(token)
      const navigate = useNavigate();
      const [validated, setValidated] = useState(false);
      const [reclamos, setReclamos] = useState([]);


      useEffect(() => {
        async function fetchReclamos() {
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
            setReclamos(data);
    
          } catch (error) {
            console.error('Error:', error);
            // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
          }
        }
    
        fetchReclamos();
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
        const reclamosData = {};
    
        formData.forEach((value, key) => {
            reclamosData[key] = value;
        });
        

    
        try {

            const reclamoID = formData.get('id');
            const estado = formData.get('estado');
            const nota = formData.get('notas');
         
            const reclamosDataToSend = {
                id: reclamoID,
                estado: estado,
                notas: nota,
              };
    


        const putURL = `/api/reclamos/${reclamoID}`;

          const response = await fetch(putURL, {
            method: 'PUT', // Cambia el método según la lógica de tu API (POST, PUT, etc.)
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(reclamosDataToSend),
          });
    
          if (!response.ok) {
            throw new Error('Error al guardar la unidad');
          }
    
          // Manejar la respuesta (redirigir, mostrar mensaje de éxito, etc.)
          navigate('/reclamo-admin'); // Redirigir a la página principal después de guardar la unidad
        } catch (error) {
          console.error('Error:', error);
          alert("OPERACION INVALIDA");
          // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
        }
      };
  
      //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
      //const formDataToObject = (formData) => {
      //  const object = {};
      //  formData.forEach((value, key) => {
      //    object[key] = value;
      //  });
      //  return object;
      //};
    
    //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
    //  const handleVolverClick = () => {
    //    navigate('/');
    //  };
      
    
    
    return (
        <div className="container">
            <h2>Menú de Reclamo</h2>
            <p>Esta sección te permite editar la información de usuario. Por favor, completa los campos necesarios.</p>
            <p>(a tener en cuenta: que en cada caso aparezcan los datos del chabón ya ingresados y él elige cuál quiere cambiar)</p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom03">
                        <Form.Label>ID Reclamo</Form.Label>
                            <Form.Select aria-label="ID Reclamo" className="custom-select" name="id">
                            <option value="" disabled hidden>Selecciona un Reclamo</option>
                            {reclamos.map(reclamo => (
                                <option key={reclamo.id} value={reclamo.id}>{reclamo.id}</option>
                            ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Selecciona un Usuario</Form.Control.Feedback>
                    </Form.Group> 

                    <Form.Group as={Col} md="4" controlId="validationCustom04">
                        <Form.Label>Medidas Tomadas</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            name="notas"
                        />
                        <Form.Control.Feedback type="invalid">Medidas tomadas</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="validationCustom07">
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
                  <option value="abierto">abierto</option>
                  <option value="proceso">en proceso</option>
                  <option value="desestimado">desestimado</option>
                  <option value="anulado">anulado</option>
                  <option value="terminado">terminado</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Por favor, selecciona el Estado del reclamo.</Form.Control.Feedback>
              </Form.Group>
                </Row>

                <Button type="submit">Editar Reclamo</Button>
            </Form>
        </div>
    );
}

export default EditarReclamo;
