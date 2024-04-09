//reclamoAdmin.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
//la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
//import { useNavigate } from 'react-router-dom';

const Reclamo = () => {
  const [reclamos, setReclamos] = useState([]);
  const [reclamosOriginales, setReclamosOriginales] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('');
  //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
  //const navigate = useNavigate();

  useEffect(() => {
    async function fetchReclamos() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/reclamos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al mostrar reclamos');
        }

        const data = await response.json();
        setReclamos(data);
        setReclamosOriginales(data);
      } catch (error) {
        console.error('Error fetching reclamos:', error);
      }
    }

    fetchReclamos();
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    // Aplicar filtro cuando cambia filtroEstado
    if (filtroEstado) {
      const reclamosFiltrados = reclamosOriginales.filter(reclamo => reclamo.estado === filtroEstado);
      setReclamos(reclamosFiltrados);
    } else {
      // Si no hay filtro, mostrar todos los reclamos originales
      setReclamos(reclamosOriginales);
    }
  }, [filtroEstado, reclamosOriginales]);


  const decodeBase64Image = (base64) => {
    return `data:image/png;base64,${base64}`;
  };


  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Menu de Reclamos del Administrador</h1>
        </div>
        <div className="description">
          <p>Por favor seleccione una de las opciones para continuar</p>
        </div>
        <div className="button-wrapper">
          <Link to="/agregar-reclamo-admin">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Agregar Reclamo
            </Button>
          </Link>
          <Link to="/editar-reclamo">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Editar Reclamo
            </Button>
          </Link>
          <Link to="/imagen-reclamo-admin">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }} >
              Agregar Imagen
            </Button>
          </Link>
        </div>
        <div className="filter-wrapper">
          <label htmlFor="estadoFilter">Filtrar por Estado:</label>
          <select
            id="estadoFilter"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="">Todos</option>
            <option value="nuevo">nuevo</option>
            <option value="abierto">abierto</option>
            <option value="proceso">proceso</option>
            <option value="desestimado">desestimado</option>
            <option value="anulado">anulado</option>
            <option value="terminado">terminado</option>
            
          </select>
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

export default Reclamo;
