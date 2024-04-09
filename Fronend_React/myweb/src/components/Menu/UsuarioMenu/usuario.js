//usuario.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
//la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas 
//import { useNavigate } from 'react-router-dom';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginales, setUsuariosOriginales] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  //la siguiente linea generaba un warning de falta de uso, se comento para eliminar si no genera problemas
  //const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/usuarios', {
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
        setUsuarios(data);
        setUsuariosOriginales(data);
      } catch (error) {
        console.error('Error fetching reclamos:', error);
      }
    }

    fetchUsuarios();
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    // Aplicar filtro cuando cambia filtroTipo
    if (filtroTipo) {
      const usuariosFiltrados = usuariosOriginales.filter(usuario => usuario.tipoUsuario === filtroTipo);
      setUsuarios(usuariosFiltrados);
    } else {
      // Si no hay filtro, mostrar todos los reclamos originales
      setUsuarios(usuariosOriginales);
    }
  }, [filtroTipo, usuariosOriginales]);

  return (
    <div className="container">
      <div className="content">
        <div className="title">
          <h1>Menu de Usuarios</h1>
        </div>
        <div className="description">
          <p>Por favor seleccione una de las opciones para continuar</p>
        </div>
        <div className="button-wrapper">
          <Link to="/agregar-usuario">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Agregar Usuario
            </Button>
          </Link>
          <Link to="/editar-usuario">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Editar Usuario
            </Button>
          </Link>
          <Link to="/eliminar-usuario">
            <Button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }}>
              Eliminar Usuario
            </Button>
          </Link>
        </div>
        <div className="filter-wrapper">
          <label htmlFor="estadoFilter">Filtrar por Tipo de Usuario:</label>
          <select
            id="tipoFilter"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="admin">admin</option>
            <option value="inquilino">inquilino</option>
            <option value="dueño">dueño</option>
            
          </select>
        </div>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Mail</th>
                <th>Tipo de Usuario</th>
                <th>Nombre de Usuario</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.dni}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.mail}</td>
                  <td>{usuario.tipoUsuario}</td>
                  <td>{usuario.usuario}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Usuario;