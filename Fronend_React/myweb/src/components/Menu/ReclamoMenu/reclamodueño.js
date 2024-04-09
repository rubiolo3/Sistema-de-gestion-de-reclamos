//reclamo.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
//la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
//import { useNavigate } from 'react-router-dom';

  const ReclamoDueño = () => {
    const [reclamos, setReclamos] = useState([]);
  
    useEffect(() => {
      async function fetchReclamos() {
        try {
          const token = localStorage.getItem('token');

          // Obtener todas las unidades
          const unidadesResponse = await fetch(`/api/unidades`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          
          if (!unidadesResponse.ok) {
            throw new Error('Error al obtener los edificios');
          }
          
          const unidadesData = await unidadesResponse.json();
          //devolver solo las unidades de las cuales el usuario sea dueño
          const unidadesDeUsuario = unidadesData.filter(unidad => unidad.idPropietario == localStorage.getItem('id'));
          console.log(unidadesDeUsuario);
          

          // obtener todos los reclamos
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
          
          //obtener un arreglo con los idEdificio de las unidades de las cuales el usuario es dueño
          const idEdificiosDeUsuario = unidadesDeUsuario.map(unidad => unidad.idEdificio);
          //filtrar los reclamos para mostrar solo aquellos pertenecientes al o los edificios en los que el usuario es propietarios de al menos una unidad
          const reclamosFiltrados = reclamosData.filter(reclamo => idEdificiosDeUsuario.includes(reclamo.idEdificio));
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
          <h1>Menu de Reclamos - Dueños</h1>
        </div>
        <div className="description">
          <p>
            Por favor seleccione una de las opciones para continuar
            (tal vez aquí abajo tendríamos que mostrar una lista con las unidades del chabón, los estados los manejamos nosotros)
          </p>
        </div>
        <div className="button-wrapper">
          <Link to="/agregar-reclamo-dueño">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Agregar Reclamo
            </Button>
          </Link>
          <Link to="/imagen-reclamo-dueño">
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
                  <td>{reclamo.idUnidad == 0 ? "Parte Comun" : reclamo.idUnidad}</td>
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

export default ReclamoDueño;