import React from 'react';

// LISTA DE DATOS: Aquí configuras tus 4 avatares
const avatars = [
  { id: 1, name: "Rumi Científico", file: "/ruCientifico.glb", img: "/ruCientifico.png" },
  { id: 2, name: "Rumi Chef",       file: "/ruChef.glb", img: "/ruChef.png" },
  { id: 3, name: "Rumi Médico", file: "/ruMedico.glb", img: "/ruMedico.png" },
  { id: 4, name: "Rumi Turista",    file: "/ruTuristico.glb", img: "/ruTuristico.png" },
];

const AvatarMenu = ({ onSelectAvatar }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#333' }}>
        Elige tu personaje
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {avatars.map((avatar) => (
          <div 
            key={avatar.id} 
            onClick={() => onSelectAvatar(avatar)}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              border: '1px solid #eee'
            }}
          >
            {/* IZQUIERDA: IMAGEN */}
            <div style={{ 
              width: '80px', height: '80px', 
              borderRadius: '10px', overflow: 'hidden', flexShrink: 0 
            }}>
              <img 
                src={avatar.img} 
                alt={avatar.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* DERECHA: NOMBRE */}
            <div style={{ paddingLeft: '20px', flexGrow: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#444' }}>{avatar.name}</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>Toque para interactuar 👉</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarMenu;