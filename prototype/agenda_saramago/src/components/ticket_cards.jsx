import React, { useState } from 'react';

function formatarData(dateString) {
  const data = new Date(dateString);
  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const diaFormatado = dia < 10 ? `0${dia}` : dia;
  const mesFormatado = mes < 10 ? `0${mes}` : mes;

  return `${diaFormatado}/${mesFormatado}/${ano}`;
}

function Card({ title, data, hora, city, location, price, imageSrc }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '400px',
        height: '600px',
        overflow: 'hidden',
        margin: '20px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <img
          src={imageSrc}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            padding: '16px',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: isHovered ? 'block' : 'none',
          }}
        >
          <h2 style={{ fontSize: '24px', marginBottom: '8px', color: '#333' }}>{title}</h2>
          <p style={{ fontSize: '16px', marginBottom: '8px', color: '#555' }}>{formatarData(data)}</p>
          <p style={{ fontSize: '16px', marginBottom: '8px', color: '#555' }}>{hora}</p>
          <p style={{ fontSize: '16px', marginBottom: '8px', color: '#555' }}>{location}, {city}</p>
          <p style={{ fontSize: '18px', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>{price} </p>
        </div>
      </div>
    </div>
  );
}

export default Card;