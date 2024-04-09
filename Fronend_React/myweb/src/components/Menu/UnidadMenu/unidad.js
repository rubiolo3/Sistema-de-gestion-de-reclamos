import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
//la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
//import { useNavigate } from 'react-router-dom';

const Unidad = () => {
  const [edificios, setEdificios] = useState([]);
  //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
  //const navigate = useNavigate();

  useEffect(() => {
    async function fetchEdificios() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/edificios', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al mostrar edificios');
        }

        const data = await response.json();
        setEdificios(data);
      } catch (error) {
        console.error('Error fetching edificios:', error);
        // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
      }
    }

    fetchEdificios();
  }, []); // Se ejecuta solo al montar el componente

  //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
  //const handleVolverClick = () => {
  //  navigate('/');
  //};

    return (
      <div className="container">
        <div className="content">
          <div className="title">
            <h1>Menu de Unidades</h1>
          </div>
          <div className="description">
            <p>Por favor seleccione una de las opciones para continuar
            </p>
          </div>
          <div className="button-wrapper">
            <Link to="/agregar-unidad">
              <Button color="primary" size="lg" style={{ width: '250px',fontSize: '20px', margin: '10px' }}>Agregar Unidad</Button>
            </Link>{' '}
            <h5>Edificios existentes</h5>
            <div className="table-wrapper">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Calle</th>
                  <th>Ciudad</th>
                  <th>Localidad</th>
                </tr>
              </thead>
              <tbody>
                {edificios.map(edificio => (
                  <tr key={edificio.id}>
                    <td>{edificio.id}</td>
                    <td>{edificio.calle}</td>
                    <td>{edificio.ciudad}</td>
                    <td>{edificio.localidad}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          </div>
        </div>

      </div>
    );
  };
  
  export default Unidad;