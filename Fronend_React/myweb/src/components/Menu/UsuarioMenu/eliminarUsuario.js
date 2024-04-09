//eliminarUsuario.js

import React, { useState } from 'react';

const EliminarUsuario = () => {
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem("id");

  const [usuarioId, setUsuarioId] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);

  const handleEliminarUsuario = async () => {
    try {
      if (usuarioId === loggedInUserId) {
        setMensaje('No puedes eliminar tu propia cuenta.');
        return;
      }

      const response = await fetch(`api/usuarios/${usuarioId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        setExito(true);
        setMensaje('Usuario eliminado correctamente');

      } else {
        setMensaje('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud DELETE:', error);
      setMensaje('Error en la solicitud DELETE');
    }
  };

  return (
    <div className="container">
      <h2>Eliminar Usuario</h2>
      <p>Ingresa el ID del usuario que deseas eliminar.</p>

      <label className="form-label">
        ID del Usuario:
        <input
          type="text"
          value={usuarioId}
          onChange={(e) => setUsuarioId(e.target.value)}
        />
      </label>

      <button color="primary" size="lg" style={{ width: '250px', fontSize: '20px', margin: '10px' }} className="button" onClick={handleEliminarUsuario}>Eliminar Usuario</button>

      {mensaje && <div className={`message ${exito ? 'success' : 'error'}`}>{mensaje}</div>}
    </div>
  );
};

export default EliminarUsuario;