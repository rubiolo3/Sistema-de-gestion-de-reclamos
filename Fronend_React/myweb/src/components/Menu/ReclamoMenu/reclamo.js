//reclamo.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

  const Reclamo = () => {
    const [reclamos, setReclamos] = useState([]);
    const idUsuario = localStorage.getItem('id')
  
    useEffect(() => {
      async function fetchReclamos() {
        try {
          const token = localStorage.getItem('token');
  
          // Obtener datos de unidades

  
          // Obtener datos de usuarios
          const usuariosResponse = await fetch(`/api/usuario/${idUsuario}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!usuariosResponse.ok) {
            throw new Error('Error al obtener los usuarios');
          }
  
          const usuarioData = await usuariosResponse.json();

          const IDunidadAlquilada = usuarioData.idUnidadAlquilada

        
          const unidadesResponse = await fetch(`/api/unidad/${IDunidadAlquilada}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!unidadesResponse.ok) {
            throw new Error('Error al obtener las unidades');
          }
  
          const unidadData = await unidadesResponse.json();
          const idEdificioFiltro = unidadData.idEdificio


          const response = await fetch('/api/reclamos', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
  
          if (!response.ok) {
            throw new Error('Error al mostrar reclamos');
          }
  
          const reclamosData = await response.json();
          
          const reclamosFiltrados = reclamosData.filter((reclamo => reclamo.idEdificio ===idEdificioFiltro)
          );
          setReclamos(reclamosFiltrados);
        } catch (error) {
          console.error('Error fetching reclamos:', error);
          // Manejar el error de alguna manera (mostrar un mensaje al usuario, por ejemplo)
        }
      }
        
  
      fetchReclamos();
    }, []); // Se ejecuta solo al montar el componente
  

    const decodeBase64Image = (base64) => {
      return `data:image/png;base64,${base64}`;
    };
  

  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Menu de Reclamos</h1>
        </div>
        <div className="description">
          <p>
            Por favor seleccione una de las opciones para continuar
            (tal vez aquí abajo tendríamos que mostrar una lista con las unidades del chabón, los estados los manejamos nosotros)
          </p>
        </div>
        <div className="button-wrapper">
          <Link to="/agregar-reclamo">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Agregar Reclamo
            </Button>
          </Link>
          <Link to="/imagen-reclamo">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }} >
              Agregar Imagen
            </Button>
          </Link>
        </div>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Estado</th>
                <th>Ubicación</th>
                <th>ID Edificio</th>
                <th>ID Unidad</th>
                <th>Tipo de Reclamo</th>
                <th>Descripción</th>
                <th>ID Usuario</th>
                <th>Notas</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {reclamos.map(reclamo => (
                <tr key={reclamo.id}>
                  <td>{reclamo.id}</td>
                  <td>{reclamo.estado}</td>
                  <td>{reclamo.ubicacion}</td>
                  <td>{reclamo.idEdificio}</td>
                  <td>{reclamo.idUnidad}</td>
                  <td>{reclamo.tipoReclamo}</td>
                  <td>{reclamo.descripcion}</td>
                  <td>{reclamo.idUsuario}</td>
                  <td>{reclamo.notas}</td>
                  <td>
                  {reclamo.imagenBase64 && (
                <img
                  src={decodeBase64Image(reclamo.imagenBase64)}
                  alt="Imagen Reclamo"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              )}
            </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reclamo;