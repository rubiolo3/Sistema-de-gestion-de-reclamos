//menuInicial.js
import React from 'react';
import './estiloMenuInicial.css';

function MenuInicial() {
    return (
      <div className="container" style={{minHeight: '500px'}}>
      <div className="content">
        <div className="title" style={{marginTop:"40px", marginBottom: '40px' }}>
        <h1>Bienvenidos al Sistema de Gestión de Reclamos</h1>
        </div>
        <div className="description">
          <p style={{ fontSize: "large", textAlign: 'justify', marginInline:'50px', marginBottom: '20px', marginTop:"20px" }}>Nuestro Sistema de Gestión de Reclamos para Administraciones de Edificios es una solución integral diseñada para simplificar y optimizar el proceso de manejo de reclamos en entornos residenciales. Con una interfaz intuitiva y funciones avanzadas, nuestro sistema está diseñado para mejorar la eficiencia operativa, facilitar la comunicación entre residentes y administradores, y garantizar una resolución rápida y efectiva de los problemas. </p>
          <p style={{ fontSize: "large", textAlign: 'justify', marginInline:'50px', marginBottom: '40px' }}> Desde la presentación inicial de un reclamo hasta su seguimiento y cierre, nuestro sistema ofrece una gestión transparente y trazable, brindando a las administraciones de edificios las herramientas necesarias para mantener una comunidad armoniosa y satisfecha. Estamos comprometidos con la excelencia en la atención al cliente y la mejora continua, asegurando que su experiencia con nuestro Sistema de Gestión de Reclamos sea sinónimo de eficacia y satisfacción.</p>
        </div>
      </div>
    </div>
    );
  }
  
  export default MenuInicial;