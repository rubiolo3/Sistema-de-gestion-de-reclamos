//imagenReclamoInquilino.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ImagenReclamoInquilino() {
  const navigate = useNavigate();

  const [id, setUserId] = useState('');
  const token = localStorage.getItem('token');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUploadImage = async () => {
    if (!id || !selectedImage) {
      alert('Por favor, ingresa el ID del reclamo y selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', selectedImage);

    try {
      const response = await fetch(`/api/reclamos/imagen/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      alert('Imagen cargada con éxito');
      navigate('/reclamo-inquilino');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir la imagen');
    }
  };

  return (
    <div className="container">
      <h2>Subir Imagen de Reclamo - Inquilino</h2>
      <p>Ingresa el ID del reclamo y selecciona una imagen para subirla.</p>

      <label className="form-label" style={{ marginBottom: '10px' }}>
        ID del Reclamo:
        <input type="text" value={id} onChange={handleUserIdChange} />
      </label>

      <label className="form-label" style={{ marginBottom: '10px' }}>
        Seleccionar Imagen:
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </label>

      <button
        className="button"
        onClick={handleUploadImage}
        style={{ fontSize: '20px', marginTop: '20px', width: '150px' }}
      >
        Subir Imagen
      </button>
    </div>
  );
}

export default ImagenReclamoInquilino;
