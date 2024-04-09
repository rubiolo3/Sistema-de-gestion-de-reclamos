import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Edificio = () => {
  const [edificios, setEdificios] = useState([]);
  const navigate = useNavigate();

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

  const handleVolverClick = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Menu de Edificios</h1>
        </div>
        <div className="description">
          <p>Por favor seleccione una de las opciones para continuar</p>
        </div>
        <div className="button-wrapper">
          <Link to="/agregar-edificio">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>Agregar Edificio</Button>
          </Link>{' '}
          <div className="table-wrapper">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Calle</th>
                  <th>Ciudad</th>
                  <th>Localidad</th>
                </tr>
              </thead>
              <tbody>
                {edificios.map(edificio => (
                  <tr key={edificio.id}>
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

export default Edificio;